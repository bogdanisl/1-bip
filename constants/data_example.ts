import { ArticleFull } from "@/types/Article";
import { Attachment } from "@/types/Attachment";

export const FAKE_CITIES = [
  { id: '1', code: '42100', name: 'Gmina Testowa' },
  { id: '2', code: '42300', name: 'Gmina Testowo' },
  { id: '3', code: '42400', name: 'Gmina Test' },
  { id: '4', code: '42400', name: 'Gmina Test 2' },
  { id: '5', code: '42400', name: 'Gmina Test 3' },
  { id: '6', code: '42200', name: 'Gmina Testowska' },
  { id: '7', code: '42500', name: 'Gmina Testowadło' },
];

export const articles_examples_full: ArticleFull[] = [
  // === Обычная статья (artTypeId: 0) ===
  {
    id: 101,
    categoryId: 5,
    slug: 'mobile-app-test',
    title: 'Mobile App Test',
    subtitle: 'Podtytuł mobile app',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris sit amet massa posuere faucibus. In sed tellus mattis, gravida sem eu, cursus dolor. Mauris eget augue quis massa venenatis venenatis sed a turpis. Etiam condimentum tristique orci eget lacinia. Vestibulum scelerisque est id ullamcorper posuere. Aliquam consequat feugiat orci, vel convallis urna pharetra non. Pellentesque sollicitudin tellus in congue facilisis. Duis vulputate est id semper varius.\nNam aliquet augue vel sollicitudin luctus. Quisque molestie sapien eu orci cursus, eget gravida tellus tempor. Curabitur ornare nunc elit. Morbi eleifend mattis rutrum. Morbi mollis porttitor odio, ac gravida mi consectetur quis. Fusce vel semper velit. Etiam sit amet arcu libero. Curabitur sollicitudin ex ut dolor venenatis, scelerisque accumsan erat porttitor. Vestibulum vestibulum congue arcu, a interdum orci ultricies maximus. ',
    addedDate: new Date('2025-11-27T10:30:00+01:00'),
    createdDate: new Date('2025-11-27T10:30:00+01:00'),
    approvedAt: new Date('2025-11-27T09:15:00+01:00'),
    deleteDate: null,
    readCount: 11,
    source: 'serwis.av1.pl.',
    keywords: 'boisko, regulamin, sport, zasady',
    artTypeId: 0,
    status: '1',
    authorId: 7,
    categoryId1: 12,
    categoryId2: undefined,
    categoryId3: undefined,
    // поля других типов — отсутствуют или null
    handleNumber: undefined,
    fromDay: undefined,
    regarding: undefined,
    obliges: undefined,
    caseType: undefined,
    settlePlace: undefined,
    requiredDocuments: undefined,
  },

  // === Uchwała (artTypeId: 1) ===
  {
    id: 102,
    categoryId: 3,
    slug: 'uchwala-15-2025',
    handleNumber: 'Uchwała Nr 15/2025',
    fromDay: '20.03.2025',
    regarding: 'W sprawie budżetu gminy na 2026 rok',
    obliges: 'Wszystkie jednostki podległe gminie',
    content: 'Na podstawie art. 18 ust. 2 pkt 8 ustawy o samorządzie gminnym...',
    addedDate: new Date('2025-11-06T10:30:00+01:00'),
    createdDate: new Date('2025-11-06T10:30:00+01:00'),
    approvedAt: new Date('2025-11-06T09:15:00+01:00'),
    deleteDate: null,
    readCount: 156,
    source: 'Rada Gminy',
    keywords: 'budżet, uchwała, finanse, 2026',
    artTypeId: 1,
    status: '1',
    authorId: 3,
    categoryId1: 8,
    categoryId2: 15,
    categoryId3: undefined,
    // поля других типов
    title: undefined,
    subtitle: undefined,
    caseType: undefined,
    settlePlace: undefined,
    requiredDocuments: undefined,
  },

  // === Jak załatwić sprawę (artTypeId: 2) ===
  {
    id: 103,
    categoryId: 8,
    slug: 'jak-zalatwic-dowod',

    // CaseArticle fields
    caseType: 'Wydanie dowodu osobistego',
    settlePlace: 'Urząd Stanu Cywilnego, pokój 12',
    requiredDocuments: '\n• aktualne zdjęcie\n• stary dowód (jeśli był)\n• wypełniony wniosek',
    content: 'Krok 1: Przygotuj wymagane dokumenty...\nKrok 2: Umów się na wizytę online lub przyjdź osobiście...',
    recipientPlace: 'Pokój 12 lub skrzynka podawcza',
    payments: 'Bez opłat',
    settleTerm: 'do 30 dni od złożenia kompletnego wniosku',
    cancelMode: undefined,      // optional
    remarks: undefined,         // optional
    legalBasis: undefined,      // optional
    caseContent: undefined,     // optional
    accepted: undefined,        // optional
    confirmedBy: undefined,     // optional

    // BaseArticle fields
    source: 'Referat Spraw Obywatelskich',
    readCount: 892,
    addedDate: new Date('2025-11-06T10:30:00+01:00'),
    createdDate: new Date('2025-11-06T10:30:00+01:00'),
    approvedAt: new Date('2025-11-06T09:15:00+01:00'),
    deleteDate: null,

    authorId: 12,
    keywords: 'dowód osobisty, wniosek, urząd, dokumenty',

    categoryId1: 22,
    categoryId2: undefined,
    categoryId3: undefined,

    artTypeId: 2,
  },

  // === Ещё одна обычная статья (для разнообразия) ===
  {
    id: 104,
    categoryId: 10,
    slug: 'harmonogram-wywozu-odpadow-2026',
    title: 'Harmonogram wywozu odpadów 2026',
    content: 'Szanowni Mieszkańcy! Od 1 stycznia 2026 zmienia się harmonogram odbioru odpadów segregowanych...',
    addedDate: new Date('2025-11-06T10:30:00+01:00'),
    createdDate: new Date('2025-11-06T10:30:00+01:00'),
    approvedAt: new Date('2025-11-06T09:15:00+01:00'),
    deleteDate: null,
    readCount: 312,
    keywords: 'śmieci, harmonogram, odpady, 2026',
    artTypeId: 0,
    status: '1',
    authorId: 5,
  },
  {
    id: 105,
    categoryId: 10,
    slug: 'test-zalacznikow',
    title: 'Test załączników',
    content: 'Test załączników',
    addedDate: new Date('2025-11-06T10:30:00+01:00'),
    createdDate: new Date('2025-11-06T10:30:00+01:00'),
    approvedAt: new Date('2025-11-06T09:15:00+01:00'),
    deleteDate: null,
    readCount: 312,
    keywords: 'śmieci, harmonogram, odpady, 2026',
    attachments: [
      {
        id: 501,
        name: "Lorem-ipsum-dolor-sit-amet_26",
        extension: "pdf",
        size: 285743,
        language: "pl"
      },
      {
        id: 502,
        name: "Lorem-ipsum-dolor-sit-amet_2",
        extension: "doc",
        size: 56789,
        language: "pl"
      }
      ,
      {
        id: 503,
        name: "duzy-pdf-2",
        extension: "pdf",
        size: 56789,
        language: "pl"
      }
      ,
      {
        id: 504,
        name: "Lorem-ipsum-dolor-sit-amet_2",
        extension: "png",
        size: 56789,
        language: "pl"
      }
      ,
      {
        id: 505,
        name: "ARCHIWA",
        extension: "rar",
        size: 56789,
        language: "pl"
      }
    ],
    artTypeId: 0,
    status: '1',
    authorId: 5,
  }
];
