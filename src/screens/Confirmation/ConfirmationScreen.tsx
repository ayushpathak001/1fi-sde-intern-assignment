import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radius, spacing, typography } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { PrimaryButton } from '../../components/PrimaryButton';
import { formatCurrency } from '../../utils/format';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Confirmation'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;

/**
 * Shown after the user taps Proceed on Product Details. Purely a summary
 * screen — the assignment explicitly does not require real payment or
 * lending processing.
 */
export function ConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { productName, productImageUrl, variant, totalPrice, emiPlan } =
    route.params;

  const handleDone = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconWrap}>
          <Ionicons name="checkmark-circle" size={56} color={colors.success} />
        </View>
        <Text style={styles.title}>Plan selected</Text>
        <Text style={styles.subtitle}>
          You've selected this EMI plan for your purchase. This is a sample
          flow — no real order or loan has been created.
        </Text>

        <View style={styles.card}>
          <View style={styles.productRow}>
            <Image source={{ uri: productImageUrl }} style={styles.image} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.variantLabel}>Variant: {variant.label}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <SummaryRow label="Product price" value={formatCurrency(totalPrice)} />
          <SummaryRow
            label="EMI duration"
            value={`${emiPlan.months} months`}
          />
          <SummaryRow
            label="Monthly EMI"
            value={`${formatCurrency(emiPlan.monthlyAmount)}/month`}
          />
          <SummaryRow label="EMI type" value={emiPlan.interestNote} />
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="Done" onPress={handleDone} />
      </View>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  successIconWrap: {
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  variantLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
