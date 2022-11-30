export const TRANSITIONS = {
  isEmpty: {
    fetchMealPlans: 'FETCH_MEAL_PLANS',
  },
  isLoading: {
    fetchMealPlansSuccess: 'FETCH_MEAL_PLANS_SUCCESS',
    fetchMealPlansError: 'FETCH_MEAL_PLANS_ERROR',
    addMealToMealsSectionSuccess: 'ADD_MEAL_TO_MEALS_SECTION_SUCCESS',
    addMealToMealsSectionError: 'ADD_MEAL_TO_MEALS_SECTION_ERROR',
  },
  mealPlans: {
    choseDay: 'CHOSE_DAY',
  },
  days: {
    goBackToMealPlans: 'GO_BACK_TO_MEAL_PLANS',
    choseMealsSection: 'CHOSE_MEALS_SECTION',
  },
  mealsSections: {
    goBackToDays: 'GO_BACK_TO_DAYS',
    addMealToMealsSection: 'ADD_MEAL_TO_MEALS_SECTION',
  },
};
