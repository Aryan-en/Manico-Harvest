import type { ReactElement } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Clock, Users, BookOpen, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Recipes — Manico Harvest",
  description: "Simple, nourishing ways to incorporate functional superfoods into your everyday meals.",
};

type Recipe = {
  title: string;
  category: string;
  prepTime: string;
  servings: string;
  calories: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  accentColor: string;
  badgeBg: string;
};

const RECIPES: Recipe[] = [
  {
    title: "Moringa Sattu Protein Smoothie",
    category: "Moringa Sattu",
    prepTime: "5 mins",
    servings: "1 serving",
    calories: "280 kcal",
    difficulty: "Easy",
    ingredients: [
      "2 tbsp Manico Harvest Moringa Sattu",
      "1 ripe Banana (frozen is best)",
      "250ml Almond or Oat Milk",
      "1 tbsp Honey or Maple Syrup",
      "A pinch of Cinnamon",
      "1 tsp Chia seeds (for topping)"
    ],
    instructions: [
      "Add the Moringa Sattu, frozen banana, milk, honey, and cinnamon into a high-speed blender.",
      "Blend on high for 60 seconds until completely smooth and creamy.",
      "Pour into a tall glass, sprinkle chia seeds on top, and enjoy immediately as a post-workout recovery drink."
    ],
    accentColor: "var(--color-brand-primary)",
    badgeBg: "rgba(42, 70, 16, 0.08)"
  },
  {
    title: "Adaptogenic Mushroom Coffee Latte",
    category: "Mushroom Coffee",
    prepTime: "5 mins",
    servings: "1 serving",
    calories: "120 kcal",
    difficulty: "Easy",
    ingredients: [
      "1 tsp Manico Harvest Mushroom Coffee",
      "150ml Hot Water (not boiling)",
      "100ml Oat or Coconut Milk",
      "1 tsp Coconut Sugar or Maple Syrup",
      "A pinch of Cocoa powder or Cinnamon"
    ],
    instructions: [
      "Dissolve the Mushroom Coffee in hot water (around 85°C / 185°F) in your favorite mug.",
      "Stir in your sweetener of choice until dissolved.",
      "Gently heat and froth the oat/coconut milk, then pour over the coffee base.",
      "Dust the top with cocoa powder or cinnamon for a comforting morning ritual."
    ],
    accentColor: "#3D2409", // Warm brown matching coffee
    badgeBg: "rgba(61, 36, 9, 0.08)"
  },
  {
    title: "Mushroom Quinoa Dosa Wraps",
    category: "Mushroom Quinoa Dosa",
    prepTime: "15 mins",
    servings: "2 servings",
    calories: "340 kcal",
    difficulty: "Medium",
    ingredients: [
      "1 cup Manico Harvest Mushroom Quinoa Dosa Mix",
      "1 cup Water (adjust for batter consistency)",
      "1/2 Avocado, sliced",
      "100g Grilled Paneer or Tofu (spiced with turmeric and chili)",
      "Handful of fresh baby Spinach",
      "1 tsp Ghee or Coconut Oil (for cooking)"
    ],
    instructions: [
      "Whisk the Dosa Mix with water to form a smooth, pourable batter. Let it rest for 5 minutes.",
      "Heat a non-stick tawa/skillet, grease lightly with ghee or coconut oil.",
      "Pour a ladle of batter and spread in a circular motion to make a thin, crispy dosa. Cook until golden brown on both sides.",
      "Place spinach, grilled tofu/paneer, and avocado slices in the center of the dosa.",
      "Fold the dosa into a wrap and serve hot with a side of mint chutney."
    ],
    accentColor: "var(--color-brand-accent)",
    badgeBg: "rgba(219, 81, 0, 0.08)"
  },
  {
    title: "Savory Millet Chilla Tacos",
    category: "Multi Millet Chilla",
    prepTime: "10 mins",
    servings: "2 servings",
    calories: "290 kcal",
    difficulty: "Medium",
    ingredients: [
      "1 cup Manico Harvest Multi Millet Chilla Mix",
      "3/4 cup Water",
      "1/2 cup Finely chopped bell peppers, onions, and coriander",
      "2 tbsp Greek yogurt or Hummus",
      "Sprouts or microgreens for topping",
      "A squeeze of fresh Lemon juice"
    ],
    instructions: [
      "Mix the Chilla Mix, water, and chopped vegetables in a bowl to create a medium-thick batter.",
      "Pour onto a hot griddle and cook for 2-3 minutes on each side until cooked through and slightly crisp.",
      "Carefully bend the warm chilla slightly to form a taco shell shape.",
      "Spread a layer of Greek yogurt or hummus inside, fill with sprouts/microgreens, and finish with a squeeze of fresh lemon."
    ],
    accentColor: "#7A3200", // Earthy chilla tone
    badgeBg: "rgba(122, 50, 0, 0.08)"
  }
];

export default function RecipesPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: "var(--color-bg-base)" }}>
        <PageHeader
          eyebrow="OUR KITCHEN"
          title="Superfood Recipes"
          description="Nourish your body daily. Discover quick, creative, and delicious ways to integrate our functional grains and adaptogens into your meals."
        />

        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RECIPES.map((recipe, i) => (
              <Reveal
                key={recipe.title}
                delay={i * 90}
                className="flex flex-col rounded-3xl overflow-hidden bg-surface border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-bg-surface)",
                }}
              >
                {/* Header Section */}
                <div className="p-6 sm:p-8 border-b" style={{ borderColor: "var(--color-border)" }}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                      style={{ background: recipe.badgeBg, color: recipe.accentColor }}
                    >
                      {recipe.category}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                      style={{ background: "rgba(0,0,0,0.05)", color: "var(--color-text-secondary)" }}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-4"
                    style={{ color: "var(--color-brand-primary)" }}
                  >
                    {recipe.title}
                  </h2>

                  {/* Stats Bar */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-secondary" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="opacity-70" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="opacity-70" />
                      {recipe.servings}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame size={14} className="opacity-70" />
                      {recipe.calories}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
                  {/* Ingredients Column */}
                  <div
                    className="md:col-span-5 p-6 sm:p-8 border-b md:border-b-0 md:border-r"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "rgba(247, 238, 217, 0.2)"
                    }}
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: recipe.accentColor }}>
                      <BookOpen size={15} />
                      Ingredients
                    </h3>
                    <ul className="space-y-3">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="text-xs sm:text-sm flex items-start gap-2 text-secondary" style={{ color: "var(--color-text-secondary)" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" style={{ background: recipe.accentColor }} />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Directions Column */}
                  <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "var(--color-brand-primary)" }}>
                        Directions
                      </h3>
                      <ol className="space-y-4">
                        {recipe.instructions.map((step, i) => (
                          <li key={i} className="text-xs sm:text-sm flex gap-3 text-secondary" style={{ color: "var(--color-text-secondary)" }}>
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-inverse shrink-0 mt-0.5"
                              style={{ background: recipe.accentColor }}
                            >
                              {i + 1}
                            </span>
                            <p className="leading-relaxed">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
