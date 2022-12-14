import {
  ListRenderItem,
  FlatList,
  View,
  Text,
  Dimensions,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store/AppState";
import * as cartAction from "../../store/actions/cart.action";
import Product from "../../models/data/Product";

const screen = Dimensions.get("window");
const screenPadding = 16;
const columnCount = 2;
const itemSize = PixelRatio.roundToNearestPixel(
  (screen.width - screenPadding * (columnCount + 1)) / columnCount
);

export default function ProductsScreen() {
  const products = useSelector((state: AppState) => state.product.products);

  const dispatch = useDispatch();

  const renderProduct: ListRenderItem<Product> = ({ item: product }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => dispatch(cartAction.addToCart(product))}
      >
        <Text style={{ fontWeight: "600" }}>{product.name}</Text>
        <Text>{product.sku}</Text>
        <Text>{product.description}</Text>
        <Text>${product.price}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View testID="customerContainer">
      <FlatList
        numColumns={columnCount}
        columnWrapperStyle={{
          marginBottom: screenPadding,
          justifyContent: "space-between",
        }}
        contentContainerStyle={{ padding: screenPadding }}
        data={products}
        renderItem={renderProduct}
        keyExtractor={(product) => product.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    width: itemSize,
    alignItems: "center",
    padding: 6,
    borderRadius: 6,
  },
});
