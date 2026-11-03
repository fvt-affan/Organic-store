/* =====================================================================
   PRODUCTS KA DATA (ek hi jagah)
   Slider aur All Products dono yahin se data lete hain, isliye naya product
   sirf yahan add karna hai, dono jagah khud aa jayega.
   Images `public/` folder me hain, isliye path "/" se shuru hota hai.
   ===================================================================== */

// Featured Slider wale products (vegetables + fruits)
export const featuredItems = [
  // Vegetables
  { id: 1, name: "Fresh Carrot", price: "Rs 120", category: "vegetables", image: "/carroot.jpg" },
  { id: 2, name: "Cauliflower", price: "Rs 150", category: "vegetables", image: "/cauliflower.jpg" },
  { id: 3, name: "Fresh Celery", price: "Rs 180", category: "vegetables", image: "/Celery.jpg" },
  { id: 4, name: "Cucumber", price: "Rs 90", category: "vegetables", image: "/Cucumber.jpg" },
  { id: 5, name: "Eggplant", price: "Rs 110", category: "vegetables", image: "/Eggplant.jpg" },
  { id: 6, name: "Fresh Beans", price: "Rs 160", category: "vegetables", image: "/freshbeans.jpg" },
  { id: 7, name: "Green Bell Pepper", price: "Rs 220", category: "vegetables", image: "/Green bell pepper.jpg" },
  { id: 8, name: "Fresh Lettuce", price: "Rs 140", category: "vegetables", image: "/Lettuce.jpg" },
  { id: 9, name: "Green Cabbage", price: "Rs 100", category: "vegetables", image: "/cabbage.jpg" },

  // Fruits
  { id: 10, name: "Fresh Coconut", price: "Rs 350", category: "fruits", image: "/Coconut.jpg" },
  { id: 11, name: "Black Grapes", price: "Rs 280", category: "fruits", image: "/Grapes.jpg" },
  { id: 12, name: "Sweet Guava", price: "Rs 190", category: "fruits", image: "/Guava.jpg" },
  { id: 13, name: "Fresh Kiwi", price: "Rs 450", category: "fruits", image: "/Kiwi.jpg" },
  { id: 14, name: "Fresh Apple", price: "Rs 250", category: "fruits", image: "/apple.jfif" },
  { id: 15, name: "Organic Banana", price: "Rs 120", category: "fruits", image: "/banana.jfif" },
  { id: 16, name: "Sweet Apricot", price: "Rs 320", category: "fruits", image: "/Apricot.jpg" },
  { id: 17, name: "Fresh Avocado", price: "Rs 400", category: "fruits", image: "/Avocado.jpg" },
  { id: 18, name: "Blackberry", price: "Rs 500", category: "fruits", image: "/Blackberry.jpg" },
  { id: 19, name: "Blueberry", price: "Rs 600", category: "fruits", image: "/Blueberry.jpg" },
];

// All Products ke apne products (snacks, dairy, dry fruits, etc.)
// id 20 se shuru kiye taake featured ke ids se na takrayein
const otherItems = [
  { id: 20, name: "Bite Size", price: "Rs 120", category: "snacks", image: "/biteSize.png" },
  { id: 21, name: "Milk Powder", price: "Rs 4,500", category: "dairy", image: "/milkpowder.png" },
  { id: 22, name: "Cashews", price: "Rs 1,200", category: "dryfruits", image: "/cashwe.png" },
  { id: 23, name: "Mini Chips", price: "Rs 150", category: "snacks", image: "/minichips.png" },
  { id: 24, name: "Beans", price: "Rs 1,350", category: "vegetables", image: "/beans.png" },
  { id: 25, name: "Coco Shake", price: "Rs 250", category: "beverages", image: "/cocoshake.png" },
  { id: 26, name: "Walnuts", price: "Rs 2,200", category: "dryfruits", image: "/walnuts.png" },
  { id: 27, name: "Yogurt", price: "Rs 250", category: "dairy", image: "/yougurt.png" },
  { id: 28, name: "Pet Shampoo Oil", price: "Rs 850", category: "petcare", image: "/petshampo.png" },
];

// All Products = unke apne 9 + slider ke saare 19 = 28 products
export const allProducts = [...otherItems, ...featuredItems];