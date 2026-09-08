import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { EmiPlan, Product, ProductVariant } from '../../types/marketplace';
import { getEmiPlans, getProductById } from '../../services/productApi';
import { VariantSelector } from '../../components/VariantSelector';
import { EmiPlanCard } from '../../components/EmiPlanCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ErrorState, LoadingState } from '../../components/StateViews';
import { formatCurrency } from '../../utils/format';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

type LoadState = 'loading' | 'success' | 'error';

export function ProductDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [emiPlans, setEmiPlans] = useState<EmiPlan[]>([]);
  const [emiLoadState, setEmiLoadState] = useState<LoadState>('loading');
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EmiPlan | null>(null);

  const loadProduct = useCallback(async () => {
    setLoadState('loading');
    try {
      const result = await getProductById(productId);
      if (!result) {
        setLoadState('error');
        return;
      }
      setProduct(result);
      setSelectedVariant(result.variants[0] ?? null);
      setLoadState('success');
    } catch {
      setLoadState('error');
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const loadEmiPlans = useCallback(async () => {
    if (!product || !selectedVariant) return;
    setEmiLoadState('loading');
    setSelectedEmiPlan(null);
    try {
      const plans = await getEmiPlans(product.id, selectedVariant.id);
      setEmiPlans(plans);
      setEmiLoadState('success');
    } catch {
      setEmiLoadState('error');
    }
  }, [product, selectedVariant]);

  useEffect(() => {
    loadEmiPlans();
  }, [loadEmiPlans]);

  const totalPrice = product
    ? product.basePrice + (selectedVariant?.priceDelta ?? 0)
    : 0;

  const canProceed = Boolean(product && selectedVariant && selectedEmiPlan);

  const handleProceed = () => {
    if (!product || !selectedVariant || !selectedEmiPlan) return;
    navigation.navigate('Confirmation', {
      productId: product.id,
      productName: product.name,
      productImageUrl: product.imageUrl,
      variant: selectedVariant,
      totalPrice,
      emiPlan: selectedEmiPlan,
    });
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
        <Text style={styles.headerTitle} numberOfLines={1}>
          Product Details
        </Text>
      </View>

      {loadState === 'loading' && <LoadingState message="Loading product..." />}

      {loadState === 'error' && (
        <ErrorState message="Unable to load this product" onRetry={loadProduct} />
      )}

      {loadState === 'success' && product && selectedVariant && (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.section}>
              <Text style={styles.brand}>{product.brand}</Text>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>{formatCurrency(totalPrice)}</Text>
              <Text style={styles.shortDescription}>
                {product.shortDescription}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <VariantSelector
                title="Storage"
                variants={product.variants}
                selectedVariantId={selectedVariant.id}
                onSelect={setSelectedVariant}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EMI Plans</Text>
              <Text style={styles.sectionSubtitle}>
                Sample EMI plans for illustration — actual rates may vary.
              </Text>

              {emiLoadState === 'loading' && (
                <LoadingState message="Loading EMI plans..." />
              )}
              {emiLoadState === 'error' && (
                <ErrorState
                  message="Unable to load EMI plans"
                  onRetry={loadEmiPlans}
                />
              )}
              {emiLoadState === 'success' && (
                <View style={styles.emiList}>
                  {emiPlans.map((plan) => (
                    <EmiPlanCard
                      key={plan.id}
                      plan={plan}
                      selected={selectedEmiPlan?.id === plan.id}
                      onSelect={setSelectedEmiPlan}
                    />
                  ))}
                </View>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Product Details</Text>
              <Text style={styles.description}>{product.description}</Text>
              <View style={styles.highlightsList}>
                {product.highlights.map((highlight) => (
                  <View key={highlight} style={styles.highlightRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={colors.success}
                    />
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            {selectedEmiPlan && (
              <Text style={styles.footerEmi}>
                {formatCurrency(selectedEmiPlan.monthlyAmount)}/month for{' '}
                {selectedEmiPlan.months} months
              </Text>
            )}
            <PrimaryButton
              label="Proceed"
              onPress={handleProceed}
              disabled={!canProceed}
            />
          </View>
        </>
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
    flexShrink: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  image: {
    width: '100%',
    height: 260,
    backgroundColor: colors.surfaceAlt,
  },
  section: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  brand: {
    ...typography.caption,
    color: colors.textMuted,
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  price: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  shortDescription: {
    ...typography.body,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: -spacing.xxs,
  },
  emiList: {
    gap: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
  highlightsList: {
    gap: spacing.xs,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  highlightText: {
    ...typography.body,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  footerEmi: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
