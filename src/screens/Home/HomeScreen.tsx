import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

/**
 * Home tab — a lightweight placeholder that mirrors the existing 1Fi Home
 * screen's promo banner style. The assignment scope is the Shop → Marketplace
 * flow, so Home only exists to give the bottom tab bar somewhere to start from.
 */
export function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.banner}>
        <Text style={styles.bannerOverline}>GET STARTED</Text>
        <Text style={styles.bannerTitle}>
          Shop on <Text style={styles.bannerHighlight}>no-cost EMI</Text>
        </Text>
        <Text style={styles.bannerSubtitle}>
          Backed by your mutual funds, no credit pull, no charges, and quick
          approval.
        </Text>
      </View>

      <Text style={styles.sectionLabel}>WHY 1FI</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Shop & pay later</Text>
        <Text style={styles.infoBody}>
          Head over to the Shop tab to browse the 1Fi Marketplace and pay
          using flexible EMI plans backed by your investments.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  banner: {
    backgroundColor: colors.primaryGradientEnd,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  bannerOverline: {
    ...typography.overline,
    color: colors.textOnPrimary,
    opacity: 0.85,
  },
  bannerTitle: {
    ...typography.h1,
    color: colors.textOnPrimary,
  },
  bannerHighlight: {
    color: colors.accent,
  },
  bannerSubtitle: {
    ...typography.body,
    color: colors.textOnPrimary,
    opacity: 0.9,
  },
  sectionLabel: {
    ...typography.overline,
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xxs,
  },
  infoTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  infoBody: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
