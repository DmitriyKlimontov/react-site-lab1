import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  ShoppingBag,
  User,
  LogIn,
  X,
  Menu,
  Star,
  Heart,
  ShoppingCart,
  Hammer,
  Search,
} from "lucide-react";

// --- ДАННЫЕ ТОВАРОВ (12 штук) ---
const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      name: "Перфоратор Bosch GBH 2-26",
      price: 14500,
      rating: 4.9,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&fit=crop",
    },
    {
      id: 2,
      name: "Цемент М150 (25кг)",
      price: 450,
      rating: 4.5,
      reviews: 89,
      image: "https://698acf15f3e7e70366ec222a.imgix.net/cement/cement3.jpg",
    },
    {
      id: 3,
      name: "Гипсокартон",
      price: 3200,
      rating: 4.7,
      reviews: 45,
      image:
        "https://698acf15f3e7e70366ec222a.imgix.net/gips/547550654_w640_h640_547550654.png",
    },
    {
      id: 4,
      name: "Песок",
      price: 1800,
      rating: 4.8,
      reviews: 210,
      image:
        "https://698acf15f3e7e70366ec222a.imgix.net/pesok/159c53b8dddf8ae5ed57e41197006050.png",
    },
    {
      id: 5,
      name: "Плитка керамическая 30x30",
      price: 890,
      rating: 4.6,
      reviews: 67,
      image:
        "https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1693814729/lmcode/25kguaJHLUyc6Exclq5X1g/84225495.jpg",
    },
    {
      id: 6,
      name: "Дрель-шуруповерт Makita",
      price: 7900,
      rating: 4.9,
      reviews: 342,
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&fit=crop",
    },
    {
      id: 7,
      name: "Кирпич облицовочный (шт)",
      price: 45,
      rating: 4.4,
      reviews: 15,
      image:
        "https://698acf15f3e7e70366ec222a.imgix.net/kirpichi/kirpichi2.jpg",
    },
    {
      id: 8,
      name: "Ламинат Дуб Натуральный",
      price: 1200,
      rating: 4.7,
      reviews: 92,
      image:
        "https://quickstep.spb.ru/image/cache/data-quick-step-classic-hydroseal-clh4085-big-500x500.jpg",
    },
    {
      id: 9,
      name: "Уровень строительный 60см",
      price: 1100,
      rating: 4.5,
      reviews: 54,
      image:
        "https://cdn.vseinstrumenti.ru/images/goods/ruchnoj-instrument/ruchnoj-izmeritelnyj-instrument/976298/1200x800/55212664.jpg",
    },
    {
      id: 10,
      name: "Шпаклевка финишная (20кг)",
      price: 980,
      rating: 4.8,
      reviews: 112,
      image:
        "https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1749106067/lmcode/y_LNXqwN2U6hhj93KOoZpg/86585035.png",
    },
    {
      id: 11,
      name: "Раковина керамическая",
      price: 5400,
      rating: 4.6,
      reviews: 38,
      image: "https://ir-3.ozone.ru/s3/multimedia-1-8/wc1000/8473480568.jpg",
    },
    {
      id: 12,
      name: "Стремянка алюминиевая",
      price: 4200,
      rating: 4.9,
      reviews: 156,
      image:
        "https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1730385623/lmcode/Ru5iKj71DUqcZC36PzEI9Q/88936750_03.png",
    },
  ];
};

// --- МОДАЛЬНОЕ ОКНО ---
const AuthModal = ({ isOpen, onClose, mode, setMode }) => {
  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    console.log("Интеграция с Google: Перенаправление...");
    // Здесь вызывается окно Google OAuth
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className="modal-title">
          {mode === "login" ? "Вход в кабинет" : "Регистрация"}
        </h2>

        <button className="google-auth-btn" onClick={handleGoogleLogin}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2504/2504739.png"
            alt="G"
            width="20"
          />
          <span>
            {mode === "login" ? "Войти через Google" : "Создать через Google"}
          </span>
        </button>

        <div className="divider">
          <span>или почту</span>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Ваш Email"
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">
            {mode === "login" ? "Войти" : "Продолжить"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login" ? "Впервые у нас? " : "Уже есть аккаунт? "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="auth-switch-btn"
          >
            {mode === "login" ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
};

// --- КАРТОЧКА ТОВАРА ---
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <button className="favorite-btn">
          <Heart size={18} />
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <Star size={14} fill="#FFB800" color="#FFB800" />
          <span>{product.rating}</span>
          <span className="reviews-count">({product.reviews} отзывов)</span>
        </div>
        <div className="product-footer">
          <span className="product-price">
            {product.price.toLocaleString()} ₽
          </span>
          <button className="add-to-cart-btn">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- ГЛАВНОЕ ПРИЛОЖЕНИЕ ---
const EcommerceApp = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="app">
      {/* Навигация */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <Hammer size={28} color="#FF6B35" />{" "}
            <span>
              СТРОЙ<strong>МАСТЕР</strong>
            </span>
          </div>
          <div className="nav-actions">
            <button className="nav-btn-text" onClick={() => openAuth("login")}>
              <LogIn size={20} /> Войти
            </button>
            <button
              className="nav-btn-primary"
              onClick={() => openAuth("register")}
            >
              Регистрация
            </button>
          </div>
        </div>
      </nav>

      {/* Баннер */}
      <section className="hero-banner">
        <div className="banner-content">
          <h1>Всё для стройки и ремонта</h1>
          <p>Более 50 000 товаров с доставкой в день заказа</p>
          <button className="banner-btn">Смотреть каталог</button>
        </div>
      </section>

      {/* Товары */}
      <section className="products-section">
        <h2 className="section-title">Популярные товары</h2>
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="products-grid">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />

      <style>{`
        :root {
          --primary: #FF6B35;
          --primary-hover: #e55a2b;
          --dark: #2D3436;
          --light-bg: #F4F7F6;
          --border: #dfe6e9;
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: var(--light-bg); font-family: 'Inter', sans-serif; }
        
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .navbar { background: white; padding: 0.8rem 2rem; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .logo { display: flex; align-items: center; gap: 8px; font-size: 1.4rem; color: var(--dark); }
        .nav-actions { display: flex; gap: 15px; }
        
        .nav-btn-text { background: none; border: none; display: flex; align-items: center; gap: 5px; cursor: pointer; font-weight: 500; }
        .nav-btn-primary { background: var(--primary); color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; }
        
        .hero-banner { 
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://698acf15f3e7e70366ec222a.imgix.net/banner/banner.jpg');
  
  /* Убираем жесткую высоту height: 300px */
  min-height: 200px; /* Минимальная высота, чтобы баннер не схлопнулся */
  aspect-ratio: 16 / 7; /* Соотношение сторон: баннер будет сжиматься как видео */
  
  background-size: cover;
  background-position: center;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  color: white; 
  text-align: center; 
  margin-bottom: 40px;
  padding: 20px; /* Внутренние отступы для мобилок */
}
        .banner-content h1 { 
  /* Используем clamp для плавного изменения размера шрифта */
  /* От 1.5rem до 2.5rem в зависимости от ширины экрана */
  font-size: clamp(1.5rem, 5vw, 2.5rem); 
  margin: 0; 
  line-height: 1.2;
}
  .banner-content p {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  margin-top: 10px;
}
  @media (max-width: 600px) {
  .hero-banner {
    aspect-ratio: 4 / 3; /* На мобилках делаем баннер чуть более квадратным */
    margin-bottom: 20px;
  }
}
        .banner-btn { margin-top: 20px; padding: 12px 30px; background: var(--primary); border: none; color: white; border-radius: 5px; cursor: pointer; }

        .products-section { max-width: 1200px; margin: 0 auto; padding: 0 20px 40px; }
        .section-title { margin-bottom: 25px; color: var(--dark); }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 25px; }
        
        .product-card { background: white; border-radius: 12px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; border: 1px solid var(--border); }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .product-image-wrapper { position: relative; height: 200px; }
        .product-image { width: 100%; height: 100%; object-fit: cover; }
        .favorite-btn { position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; padding: 8px; cursor: pointer; display: flex; }
        
        .product-info { padding: 15px; }
        .product-name { font-size: 1rem; margin: 0 0 10px; height: 40px; overflow: hidden; color: var(--dark); }
        .product-rating { display: flex; align-items: center; gap: 5px; font-size: 0.9rem; margin-bottom: 15px; }
        .reviews-count { color: #888; }
        .product-footer { display: flex; justify-content: space-between; align-items: center; }
        .product-price { font-size: 1.25rem; font-weight: 700; color: var(--dark); }
        .add-to-cart-btn { background: var(--light-bg); border: none; padding: 8px; border-radius: 8px; cursor: pointer; color: var(--dark); transition: 0.2s; }
        .add-to-cart-btn:hover { background: var(--primary); color: white; }

        /* Modal & Auth Styles */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal-content { background: white; padding: 30px; border-radius: 16px; width: 100%; max-width: 400px; position: relative; }
        .modal-close { position: absolute; top: 15px; right: 15px; border: none; background: none; cursor: pointer; color: #888; }
        .modal-title { margin-top: 0; text-align: center; }
        
        .google-auth-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: white; cursor: pointer; margin-bottom: 20px; font-weight: 500; }
        .divider { text-align: center; border-bottom: 1px solid var(--border); line-height: 0.1em; margin: 10px 0 25px; }
        .divider span { background: #fff; padding: 0 10px; color: #888; font-size: 0.9rem; }
        
        .auth-form { display: flex; flex-direction: column; gap: 12px; }
        .auth-input { padding: 12px; border: 1px solid var(--border); border-radius: 8px; outline: none; }
        .auth-button { background: var(--primary); color: white; border: none; padding: 14px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 10px; }
        .auth-switch { text-align: center; margin-top: 20px; font-size: 0.9rem; }
        .auth-switch-btn { background: none; border: none; color: var(--primary); font-weight: 600; cursor: pointer; }

        .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 40px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <EcommerceApp />
    </QueryClientProvider>
  );
}
