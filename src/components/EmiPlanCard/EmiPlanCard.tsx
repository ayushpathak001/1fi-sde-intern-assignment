import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { EmiPlan } from '../../types/marketplace';
import { formatCurrency } from '../../utils/format';

interface EmiPlanCardProps {
  plan: EmiPlan;
  selected: boolean;
  onSelect: (plan: EmiPlan) => void;
}

/** Selectable row for a single EMI duration, e.g. "3 Months — ₹20,000/month". */
export function EmiPlanCard({ plan, selected, onSelect }: EmiPlanCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      activeOpacity={0.85}
      onPress={() => onSelect(plan)}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.months}>{plan.months} Months</Text>
        <Text style={styles.note}>{plan.interestNote}</Text>
      </View>
      <Text style={[styles.amount, selected && styles.amountSelected]}>
        {formatCurrency(plan.monthlyAmount)}/mo
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.unselectedBorder,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.selectedBorder,
    backgroundColor: colors.primaryLight,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  textGroup: {
    flex: 1,
  },
  months: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  note: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  amount: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  amountSelected: {
    color: colors.primaryDark,
  },
});
