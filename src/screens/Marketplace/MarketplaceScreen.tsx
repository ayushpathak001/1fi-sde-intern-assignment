import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { ProductListItem } from '../../types/marketplace';
import { getCategories, getProducts } from '../../services/productApi';
import { SearchBar } from '../../components/SearchBar';
import { CategoryChip } from '../../components/CategoryChip';
import { ProductCard } from '../../components/ProductCard';
import { EmptyState, ErrorState, LoadingState } from '../../components/StateViews';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Marketplace'>;

type LoadState = 'loading' | 'success' | 'error';

export function MarketplaceScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  const loadCategories = useCallback(async () => {
    try {
      const result = await getCategories();
      setCategories(result);
    } catch {
      // Category chips are a nice-to-have; a failure here shouldn't block the listing.
    }
  }, []);

  const loadProducts = useCallback(async () => {
    setLoadState('loading');
    try {
      const result = await getProducts({
        query: searchQuery,
        category: selectedCategory ?? undefined,
      });
      setProducts(result);
      setLoadState('success');
    } catch {
      setLoadState('error');
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    // Debounce search input slightly so we don't re-fetch on every keystroke.
    const timeout = setTimeout(() => {
      loadProducts();
    }, 250);
    return () => clearTimeout(timeout);
  }, [loadProducts]);

  const handleProductPress = (product: ProductListItem) => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1Fi Marketplace</Text>
      </View>

      <View style={styles.searchWrap}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
        />
      </View>

      {categories.length > 0 && (
        <View style={styles.chipsWrap}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContent}
            renderItem={({ item }) => (
              <CategoryChip
                label={item}
                selected={selectedCategory === item}
                onPress={() =>
                  setSelectedCategory((current) => (current === item ? null : item))
                }
              />
            )}
          />
        </View>
      )}

      {loadState === 'loading' && <LoadingState message="Loading products..." />}

      {loadState === 'error' && (
        <ErrorState message="Unable to load products" onRetry={loadProducts} />
      )}

      {loadState === 'success' && products.length === 0 && (
        <EmptyState message="No products available" />
      )}

      {loadState === 'success' && products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleProductPress} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  searchWrap: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  chipsWrap: {
    paddingBottom: spacing.sm,
  },
  chipsContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  row: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  listContent: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
