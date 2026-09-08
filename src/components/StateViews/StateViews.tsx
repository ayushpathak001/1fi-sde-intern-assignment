import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { PrimaryButton } from '../PrimaryButton';

interface LoadingStateProps {
  message?: string;
}

/** Centered spinner + message, e.g. "Loading products..." */
export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

/** Centered error message with a Retry CTA, e.g. "Unable to load products" */
export function ErrorState({
  message = 'Something went wrong',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.center}>
      <Ionicons name="alert-circle-outline" size={40} color={colors.danger} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <PrimaryButton label="Retry" onPress={onRetry} style={styles.retryButton} />
      )}
    </View>
  );
}

interface EmptyStateProps {
  message?: string;
}

/** Centered empty-state message, e.g. "No products available" */
export function EmptyState({ message = 'Nothing to show here' }: EmptyStateProps) {
  return (
    <View style={styles.center}>
      <Ionicons name="cube-outline" size={40} color={colors.textMuted} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  message: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
});
