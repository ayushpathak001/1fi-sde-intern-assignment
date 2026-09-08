import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { ProductVariant } from '../../types/marketplace';

interface VariantSelectorProps {
  title: string;
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variant: ProductVariant) => void;
}

/**
 * Renders a labeled row of selectable variant pills (e.g. "Storage: 128 GB / 256 GB").
 * The selected pill gets a filled purple state; others stay outlined.
 */
export function VariantSelector({
  title,
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          return (
            <TouchableOpacity
              key={variant.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              activeOpacity={0.8}
              onPress={() => onSelect(variant)}
              style={[styles.pill, isSelected && styles.pillSelected]}
            >
              <Text
                style={[styles.pillLabel, isSelected && styles.pillLabelSelected]}
              >
                {variant.label}
              </Text>
              {variant.priceDelta > 0 && (
                <Text
                  style={[
                    styles.pillDelta,
                    isSelected && styles.pillLabelSelected,
                  ]}
                >
                  {' '}
                  +₹{variant.priceDelta.toLocaleString('en-IN')}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.unselectedBorder,
    backgroundColor: colors.surface,
  },
  pillSelected: {
    borderColor: colors.selectedBorder,
    backgroundColor: colors.primaryLight,
  },
  pillLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  pillDelta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  pillLabelSelected: {
    color: colors.primaryDark,
  },
});
