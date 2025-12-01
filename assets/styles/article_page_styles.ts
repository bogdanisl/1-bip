import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38,
    flex: 1,
    marginRight: 12,
  },
  viewCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewCountText: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 20,
  },
  contentSection: {
    paddingVertical: 32,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  contentText: {
    fontSize: 17,
    // lineHeight: 24,
    //paddingRight:10,
    textAlign: 'justify',
  },
  matrykaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 24,
  },
  matrykaTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  matrykaContent: {
    paddingVertical: 16,
    gap: 20,
  },
  categorySection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 99,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoRow: {
    gap: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 15.5,
    lineHeight: 22,
  },
});