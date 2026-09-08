import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radius, spacing, typography } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { TopBrandsScreen } from '../TopBrands';
import { NearbyStoresScreen } from '../NearbyStores';

type ShopSection = 'topBrands' | 'nearbyStores';

type ShopNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Shop screen — rebuilt to match the existing 1Fi Shop screenshot:
 * purple "Shop today, Pay later using Mutual funds" banner, followed by a
 * three-way selector for Top Brands / Nearby Stores / 1Fi Marketplace.
 *
 * Top Brands and Nearby Stores stay as blank placeholders (per the
 * assignment). Selecting "1Fi Marketplace" pushes the fully-implemented
 * Marketplace flow as its own stack screen, since it is a self-contained
 * multi-step experience rather than another in-place tab.
 */
export function ShopScreen() {
  const navigation = useNavigation<ShopNavigationProp>();
  const [section, setSection] = useState<ShopSection>('topBrands');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        <View style={styles.banner}>
          <View style={styles.badge}>
            <Ionicons name="sparkles" size={12} color={colors.textOnPrimary} />
            <Text style={styles.badgeText}>NO-COST EMIS</Text>
          </View>
          <Text style={styles.bannerTitle}>
            Shop today,{'\n'}
            <Text style={styles.bannerItalic}>Pay later </Text>
            using Mutual funds.
          </Text>
          <Text style={styles.bannerSubtitle}>
            No credit score required. No interest. Backed by your
            investments.
          </Text>
        </View>

        <View style={styles.selectorWrap}>
          <View style={styles.selector}>
            <SelectorTab
              label="Top Brands"
              active={section === 'topBrands'}
              onPress={() => setSection('topBrands')}
            />
            <SelectorTab
              label="Nearby Stores"
              active={section === 'nearbyStores'}
              onPress={() => setSection('nearbyStores')}
            />
          </View>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Marketplace')}
          style={styles.marketplaceCard}
        >
          <View style={styles.marketplaceIconWrap}>
            <Ionicons name="storefront" size={22} color={colors.primary} />
          </View>
          <View style={styles.marketplaceTextGroup}>
            <Text style={styles.marketplaceTitle}>1Fi Marketplace</Text>
            <Text style={styles.marketplaceSubtitle}>
              Browse products and shop on flexible EMIs
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        <View style={styles.sectionContent}>
          {section === 'topBrands' ? <TopBrandsScreen /> : <NearbyStoresScreen />}
        </View>
      </ScrollView>
    </View>
  );
}

function SelectorTab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.selectorTab, active && styles.selectorTabActive]}
    >
      <Text
        style={[
          styles.selectorTabLabel,
          active && styles.selectorTabLabelActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    backgroundColor: colors.primaryGradientEnd,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: {
    ...typography.caption,
    color: colors.textOnPrimary,
  },
  bannerTitle: {
    ...typography.h1,
    color: colors.textOnPrimary,
  },
  bannerItalic: {
    fontStyle: 'italic',
  },
  bannerSubtitle: {
    ...typography.body,
    color: colors.textOnPrimary,
    opacity: 0.85,
  },
  selectorWrap: {
    marginTop: -spacing.xl,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    paddingBottom: spacing.sm,
  },
  selector: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    padding: 4,
  },
  selectorTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  selectorTabActive: {
    backgroundColor: colors.surface,
  },
  selectorTabLabel: {
    ...typography.bodyBold,
    color: colors.textSecondary,
  },
  selectorTabLabelActive: {
    color: colors.primary,
  },
  marketplaceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  marketplaceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketplaceTextGroup: {
    flex: 1,
  },
  marketplaceTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  marketplaceSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  sectionContent: {
    minHeight: 300,
  },
});
