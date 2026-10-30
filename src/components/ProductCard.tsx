import React from 'react';
import { Plus, Heart, Check, Clock } from 'lucide-react';
import { Product } from '../types';
import { Currency } from './Currency';
import { 
  OrganicBadge, 
  VeganBadge, 
  GlutenFreeBadge, 
  ChefSpecialBadge, 
  BestSellerBadge, 
  RatingBadge, 
  MacroPill 
} from './Badges';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  cartQuantity?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  isFavorite,
  onToggleFavorite,
  cartQuantity = 0
}) => {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Photo Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.isChefSpecial && <ChefSpecialBadge />}
          {product.isBestSeller && <BestSellerBadge />}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs backdrop-blur-sm transition-all active:scale-90 ${
            isFavorite ? 'text-rose-600' : 'text-slate-400 hover:text-slate-700'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Bottom Floating Rating & Prep Time */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between text-white">
          <RatingBadge rating={product.rating} reviews={product.reviewsCount} />
          <span className="text-[11px] font-bold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-slate-100 flex items-center gap-1 border border-white/20">
            <Clock className="w-3 h-3" />
            {product.prepTime}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Dietary Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {product.isOrganic && <OrganicBadge size="sm" />}
            {product.isVegan && <VeganBadge size="sm" />}
            {product.isGlutenFree && <GlutenFreeBadge size="sm" />}
          </div>

          {/* Product Title */}
          <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-emerald-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-medium">
            {product.tagline}
          </p>

          {/* Nutrition Macro Pill */}
          <div className="mt-2.5">
            <MacroPill calories={product.calories} protein={product.protein} />
          </div>
        </div>

        {/* Bottom Price & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <Currency amount={product.price} size="lg" className="text-emerald-700" />
            {product.originalPrice && product.originalPrice > product.price && (
              <Currency amount={product.originalPrice} size="sm" strikeThrough />
            )}
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-xs transition-all active:scale-95 ${
              !product.inStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : cartQuantity > 0
                ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {cartQuantity > 0 ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{cartQuantity} in Cart</span>
              </>
            ) : !product.inStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
