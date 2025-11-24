// app.js - main controller (modular version)

import { loadRecipes, saveRecipes, generateId } from "./storage.js";
import { validateRecipeForm } from "./validation.js";
import {
  renderRecipeList,
  showRecipeDetail,
  showFormErrorsUI,
  hideFormErrorsUI,
  showToast,
  initTypeSlider,
  getTypeFilterValue,
  switchView,
} from "./ui.js";

let recipes = [];
let currentRecipeId = null;

const PER_PAGE = 9;
let currentPage = 1;

/* ===== DOM (form & filters) ===== */
const addRecipeBtn = document.getElementById("addRecipeBtn");
const backToListFromDetail = document.getElementById("backToListFromDetail");
const backToListFromForm = document.getElementById("backToListFromForm");
const cancelFormBtn = document.getElementById("cancelFormBtn");

const searchInput = document.getElementById("searchInput");
const difficultyFilter = document.getElementById("difficultyFilter");
const favoritesOnlyToggle = document.getElementById("favoritesOnlyToggle");
const favoritesToggleLabel = document.getElementById("favoritesToggleLabel");

const recipeForm = document.getElementById("recipeForm");
const formTitle = document.getElementById("formTitle");
const recipeIdInput = document.getElementById("recipeId");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const ingredientsInput = document.getElementById("ingredients");
const stepsInput = document.getElementById("steps");
const prepTimeInput = document.getElementById("prepTime");
const cookTimeInput = document.getElementById("cookTime");
const difficultyInput = document.getElementById("difficulty");
const recipeTypeInput = document.getElementById("recipeType");
const imageUrlInput = document.getElementById("imageUrl");

const editRecipeBtn = document.getElementById("editRecipeBtn");
const deleteRecipeBtn = document.getElementById("deleteRecipeBtn");
const detailFavoriteBtn = document.getElementById("detailFavoriteBtn");
const copyIngredientsBtn = document.getElementById("copyIngredientsBtn");
const printRecipeBtn = document.getElementById("printRecipeBtn");

const fabAddRecipe = document.getElementById("fabAddRecipe");

/* ===== Helpers ===== */
function getFilters() {
  return {
    search: searchInput.value.trim().toLowerCase(),
    difficulty: difficultyFilter.value,
    type: getTypeFilterValue(),
    favoritesOnly: favoritesOnlyToggle ? favoritesOnlyToggle.checked : false,
  };
}

function refreshList() {
  renderRecipeList(recipes, getFilters(), openDetailView, {
    onFavoriteToggle: handleToggleFavorite,
    pagination: {
      page: currentPage,
      perPage: PER_PAGE,
      onPageChange: (newPage) => {
        currentPage = newPage;
        refreshList();
      },
    },
  });
}

function clearForm() {
  recipeIdInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
  ingredientsInput.value = "";
  stepsInput.value = "";
  prepTimeInput.value = "";
  cookTimeInput.value = "";
  difficultyInput.value = "";
  recipeTypeInput.value = "";
  imageUrlInput.value = "";
  hideFormErrorsUI();
}

/* ===== Detail / Form open ===== */
function openDetailView(id) {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return;
  currentRecipeId = id;
  showRecipeDetail(recipe);
  updateDetailFavoriteButton();
}

function openAddForm() {
  clearForm();
  formTitle.textContent = "Add Recipe";
  switchView("form");
  showToast("Creating a new recipe…", "info");
}

function openEditForm(id) {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return;

  clearForm();
  formTitle.textContent = "Edit Recipe";
  recipeIdInput.value = recipe.id;
  titleInput.value = recipe.title || "";
  descriptionInput.value = recipe.description || "";
  ingredientsInput.value = (recipe.ingredients || []).join("\n");
  stepsInput.value = (recipe.steps || []).join("\n");
  prepTimeInput.value = recipe.prepTime ?? "";
  cookTimeInput.value = recipe.cookTime ?? "";
  difficultyInput.value = recipe.difficulty || "";
  recipeTypeInput.value = recipe.type || "veg";
  imageUrlInput.value = recipe.imageUrl || "";

  switchView("form");
}

/* ===== Favorites helpers ===== */

function handleToggleFavorite(id) {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return;

  recipe.isFavorite = !recipe.isFavorite;
  recipe.updatedAt = new Date().toISOString();
  saveRecipes(recipes);

  // Update detail fave button if we're on this recipe
  if (currentRecipeId === id) {
    updateDetailFavoriteButton();
  }

  refreshList();
}

function updateDetailFavoriteButton() {
  if (!detailFavoriteBtn || !currentRecipeId) return;
  const recipe = recipes.find((r) => r.id === currentRecipeId);
  if (!recipe) return;

  const isFav = !!recipe.isFavorite;
  detailFavoriteBtn.textContent = isFav ? "★ Favorited" : "☆ Add to favorites";
  detailFavoriteBtn.classList.toggle("is-favorite", isFav);
}

/* ===== Form submit ===== */
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    title: titleInput.value,
    description: descriptionInput.value,
    ingredientsRaw: ingredientsInput.value,
    stepsRaw: stepsInput.value,
    prepTime: prepTimeInput.value.trim(),
    cookTime: cookTimeInput.value.trim(),
    difficulty: difficultyInput.value,
    type: recipeTypeInput.value,
  };

  const { isValid, errors } = validateRecipeForm(formData);
  if (!isValid) {
    showFormErrorsUI(errors);
    showToast("Please fix the form errors.", "error");
    return;
  }

  hideFormErrorsUI();

  const id = recipeIdInput.value || generateId();
  const isEdit = Boolean(recipeIdInput.value);

  const ingredients = ingredientsInput.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const steps = stepsInput.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const prepNum = Number(prepTimeInput.value.trim());
  const cookNum = Number(cookTimeInput.value.trim());
  const now = new Date().toISOString();

  const recipeData = {
    id,
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    ingredients,
    steps,
    prepTime: prepNum,
    cookTime: cookNum,
    totalTime: prepNum + cookNum,
    difficulty: difficultyInput.value,
    type: recipeTypeInput.value,
    imageUrl: imageUrlInput.value.trim(),
    isFavorite: false, // default; preserved on edit below
    updatedAt: now,
  };

  if (isEdit) {
    const index = recipes.findIndex((r) => r.id === id);
    if (index !== -1) {
      recipeData.createdAt = recipes[index].createdAt || now;
      recipeData.isFavorite = !!recipes[index].isFavorite;
      recipes[index] = recipeData;
    }
    showToast("Recipe updated.", "success");
  } else {
    recipeData.createdAt = now;
    recipes.push(recipeData);
    showToast("Recipe added!", "success");
  }

  saveRecipes(recipes);
  refreshList();
  openDetailView(id);
}

/* ===== Delete ===== */
function handleDeleteRecipe() {
  if (!currentRecipeId) return;
  const recipe = recipes.find((r) => r.id === currentRecipeId);
  const title = recipe ? recipe.title : "this recipe";

  const ok = confirm(`Are you sure you want to delete "${title}"?`);
  if (!ok) return;

  recipes = recipes.filter((r) => r.id !== currentRecipeId);
  saveRecipes(recipes);
  currentRecipeId = null;
  refreshList();
  switchView("list");
  showToast("Recipe deleted.", "success");
}

/* ===== Copy ingredients ===== */
async function handleCopyIngredients() {
  if (!currentRecipeId) return;
  const recipe = recipes.find((r) => r.id === currentRecipeId);
  if (!recipe || !navigator.clipboard) {
    showToast("Clipboard not supported in this browser.", "error");
    return;
  }

  const text = (recipe.ingredients || []).join("\n");
  try {
    await navigator.clipboard.writeText(text);
    showToast("Ingredients copied to clipboard.", "success");
  } catch (err) {
    console.error(err);
    showToast("Could not copy ingredients.", "error");
  }
}

/* ===== Print / PDF ===== */
function handlePrintRecipe() {
  if (!currentRecipeId) return;
  // CSS @media print shows detail view nicely; browser can "Save as PDF"
  window.print();
}

/* ===== Event wiring ===== */
function initEvents() {
  addRecipeBtn.addEventListener("click", openAddForm);
  if (fabAddRecipe) fabAddRecipe.addEventListener("click", openAddForm);

  backToListFromDetail.addEventListener("click", () => {
    switchView("list");
    currentPage = 1;
    refreshList();
  });

  backToListFromForm.addEventListener("click", () => {
    switchView("list");
    currentPage = 1;
    refreshList();
  });

  cancelFormBtn.addEventListener("click", () => {
    switchView("list");
    currentPage = 1;
    refreshList();
  });

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    refreshList();
  });

  difficultyFilter.addEventListener("change", () => {
    currentPage = 1;
    refreshList();
  });

  if (favoritesOnlyToggle) {
    favoritesOnlyToggle.addEventListener("change", () => {
      currentPage = 1;
      if (favoritesToggleLabel) {
        favoritesToggleLabel.classList.toggle("active", favoritesOnlyToggle.checked);
      }
      refreshList();
    });
  }

  recipeForm.addEventListener("submit", handleFormSubmit);

  editRecipeBtn.addEventListener("click", () => {
    if (currentRecipeId) openEditForm(currentRecipeId);
  });

  deleteRecipeBtn.addEventListener("click", handleDeleteRecipe);

  if (detailFavoriteBtn) {
    detailFavoriteBtn.addEventListener("click", () => {
      if (!currentRecipeId) return;
      handleToggleFavorite(currentRecipeId);
      updateDetailFavoriteButton();
    });
  }

  if (copyIngredientsBtn) {
    copyIngredientsBtn.addEventListener("click", handleCopyIngredients);
  }

  if (printRecipeBtn) {
    printRecipeBtn.addEventListener("click", handlePrintRecipe);
  }

  // Header logo (home) - fixed: uses refreshList instead of raw render
  document.getElementById("homeBtn").addEventListener("click", () => {
    switchView("list");
    currentPage = 1;
    refreshList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // keyboard shortcuts (^ to add, ` to search)
  document.addEventListener("keydown", (e) => {
    if (e.key === "^") {
      e.preventDefault();
      openAddForm();
    } else if (e.key === "`" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

/* ===== Init ===== */
function init() {
  recipes = loadRecipes() || [];

  // Normalize isFavorite for older data
  recipes = recipes.map((r) => ({
    ...r,
    isFavorite: !!r.isFavorite,
  }));

  saveRecipes(recipes);

  initEvents();
  initTypeSlider(() => {
    currentPage = 1;
    refreshList();
  });

  currentPage = 1;
  refreshList();
  showToast("Welcome to Recipe Manager!", "info");
  switchView("list");

  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Since script is type="module" and loaded at the end of <body>, this is safe:
document.addEventListener("DOMContentLoaded", init);
