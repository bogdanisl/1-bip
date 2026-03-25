import DocumentViewerScreen from "@/src/features/documents/DocumentViewer";
export default function Instruction() {
    return <DocumentViewerScreen file={{ name: 'Instrukcja obsługi', url: 'https://www.1bip.pl/resources/shared/instrukcja-obslugi-aplikacji.pdf', extension: 'pdf' }} />
}