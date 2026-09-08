import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { ProductListItem } from '../../types/marketplace';
import { formatCurrency } from '../../utils/format';

interface ProductCardProps {
  product: ProductListItem;
  onPress: (product: ProductListItem) => void;
}

/**
 * Card for a single marketplace product: image, name, price and
 * "EMI from ₹X/month" — consistent with the rounded, shadowed cards
 * used for brands/stores in the existing Shop screen.
 */
export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      onPress={() => onPress(product)}
      style={styles.card}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatCurrency(product.basePrice)}</Text>
        <View style={styles.emiPill}>
          <Text style={styles.emiText}>
            EMI from {formatCurrency(product.emiFromPerMonth)}/month
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: colors.surfaceAlt,
  },
  info: {
    padding: spacing.sm,
    gap: 2,
  },
  brand: {
    ...typography.caption,
    color: colors.textMuted,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    minHeight: 36,
  },
  price: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    marginTop: 2,
  },
  emiPill: {
    marginTop: spacing.xxs,
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
  },
  emiText: {
    ...typography.caption,
    color: colors.primaryDark,
  },
});
