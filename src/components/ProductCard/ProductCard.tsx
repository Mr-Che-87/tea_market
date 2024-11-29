"use client";

import { Box, Button, Typography, CircularProgress, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import Image from "next/image";
import { IProduct } from "@/types/IProduct";
import { useRouter } from "next/navigation"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToFavourites, removeFromFavourites } from "@/store/favouritesSlice";

interface ProductCardProps {
  product: IProduct;
  loading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //проверка наличия продукта в избранном:
   const isFavourite = useSelector((state: RootState) =>
    state.favourites.favourites.some((fav) => fav.id === product.id)
  );

  //Тумблер добавления/удаления из избранного:
  const handleToggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product.id));
    } else {
      dispatch(addToFavourites(product));
    }
  };

  const handleGoToFavourites = () => {
    router.push("/favourites"); //роутинг
  };

  const handleBackToListClick = () => {
    router.push(`/product-list`); //роутинг
  };
 

  return (
    <Box sx={{ display: "flex", flexDirection: "column", fontFamily: "var(--font-roboto-reg)" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          background: "linear-gradient(to bottom, rgba(189, 189, 189, 1), rgba(255, 255, 255, 1))",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBackToListClick}
          sx={{
            padding: "10px 15px",
            fontSize: "14px",
            borderRadius: "8px",
            borderColor: "var(--green-color)",
            color: "var(--green-color)",
            textTransform: "none",
            "&:hover": {
              transform: "translateY(-2px)",
              backgroundColor: "var(--green-color)",
              color: "var(--white-color)",
            },
          }}
        >
          Назад к списку
        </Button>
        <Button
          variant="contained"
          onClick={handleGoToFavourites}
          sx={{
            padding: "10px 15px",
            fontSize: "14px",
            borderRadius: "8px",
            backgroundColor: "var(--green-color)",
            color: "var(--white-color)",
            textTransform: "none",
            "&:hover": {
              transform: "translateY(-2px)",
              backgroundColor: "#2f4a36",
            },
          }}
        >
          Избранное
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", padding: "10px" }}>
          <CircularProgress size={24} />
          <Typography sx={{ fontSize: "16px", marginTop: "10px" }}>Загрузка...</Typography>
        </Box>
      ) : product ? (
        <Box sx={{ padding: "20px 12px 10px", marginBottom: "30px" }}>
          <Typography
            variant="h2"
            sx={{
              textTransform: "uppercase",
              fontSize: "25px",
              fontWeight: "bold",
              color: "var(--green-color)",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Image
                src={product.photo}
                alt={`${product.name} photo`}
                width={600}
                height={600}
                style={{
                  borderRadius: "10px",
                  maxWidth: "400px",
                  maxHeight: "400px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "var(--green-color)",
                }}
              >
                {product.price} &#8381;
              </Typography>
            </Box>
            <IconButton
              onClick={handleToggleFavourite}
              disableRipple
              sx={{
                marginLeft: "20px",
                backgroundColor: "transparent", 
                color: isFavourite ? "gold" : "gray",
                "&:hover": {
                backgroundColor: "transparent", 
                color: "gold",
                },
              }}
            >
              {isFavourite ? (
                  <StarIcon sx={{ fontSize: "40px" }} /> 
                ) : (
                  <StarBorderIcon sx={{ fontSize: "40px" }} /> 
                )}
            </IconButton>
          </Box>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#333",
              marginTop: "15px",
              lineHeight: 1.6,
            }}
          >
            {product.fullDescription}
          </Typography>
        </Box>
      ) : (
        <Typography
          sx={{
            fontSize: "16px",
            color: "red",
            textAlign: "center",
            padding: "20px 0",
          }}
        >
          Продукт не найден
        </Typography>
      )}
    </Box>
  );
};

export default ProductCard;