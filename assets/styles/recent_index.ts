// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
    gap:15,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  recentHeader: {
    fontSize: 16,
    paddingRight:20,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  infoText: {
    fontSize: 14,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    backgroundColor:'#b50315',
    height: '100%',
    width: '40%', 
    borderRadius: 2,
  },
  readMoreButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    width:'50%',
    alignItems: 'center',
  },
  readMoreText: {
    fontFamily:'Poppins-Bold',
    fontSize: 14,
    letterSpacing:1
  },
});
