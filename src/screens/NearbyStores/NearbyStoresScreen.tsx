import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

/**
 * Placeholder — the assignment explicitly says "No implementation required.
 * The page can remain blank" for Nearby Stores.
 */
export function NearbyStoresScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nearby Stores — coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  text: {
    ...typography.body,
    color: colors.textMuted,
  },
});
