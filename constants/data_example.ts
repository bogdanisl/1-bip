import { Attachment } from "@/types/Attachment";
import { Article, Document } from "@/types/Article";
import { Employee } from "@/types/Employee";
import { OfficeData } from "@/types/OfficeData";
import { OpenHours, OpenHoursDTO } from "@/types/OpenHours";


export const FAKE_CITIES = [
  // { id: '-1', code: '42400', name: 'To jest przykładowy BIP', url: '' },
  { id: '1', code: '42400', name: 'Urząd Gminy Testowej', url: 'https://www.bip.alpanet.pl' },
  //{ id: '2', code: '42400', name: 'Nieaktywny Urząd Gminy', url: '' },
];


//   {
//     "id": 199,
//     "categoryId": 58,
//     "title": "Lorem ipsum dolor sit amet",
//     "slug": "lorem-ipsum-dolor-sit-amet-2410",
//     "content": "\u003Cp\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio a magna molestie vulputate. Quisque mauris metus, laoreet vitae metus sit amet, gravida ultrices urna. Phasellus at commodo nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi vel libero ultricies, eleifend eros sit amet, rutrum lorem. Cras a consectetur urna, et rutrum sem. In auctor accumsan faucibus. Duis varius facilisis feugiat. In in enim sed eros hendrerit vulputate vitae quis metus. Ut urna ex, luctus ac egestas sit amet, accumsan et nisl. Maecenas posuere nisl augue, vitae tincidunt quam aliquam vel. Integer sodales dolor a quam suscipit faucibus. Nam iaculis diam sed ante maximus, quis pharetra sapien interdum. Fusce at bibendum nunc, sed suscipit neque. Praesent in velit massa. Ut rutrum nunc a ex blandit dapibus.\u0026#160;\u003C\/p\u003E\r\n\u003Cp\u003EWersja 7\u003C\/p\u003E",
//     "createdAt": {
//       "date": "2025-10-24 09:51:42.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "position": 195,
//     "views": 773,
//     "author": "serwis.av1.pl",
//     "status": 1,
//     "startAt": {
//       "date": "2025-10-24 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "endAt": {
//       "date": "2045-10-24 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "producedAt": {
//       "date": "2025-10-24 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "isApproved": true,
//     "userId": "2",
//     "isMain": false,
//     "keywords": "",
//     "articleType": 0,
//     "subtitle": "Praesent a odio a magna molestie vulputate. Quisque mauris metus, laoreet vitae metus sit amet, gravida ultrices urna.",
//     "resolutionNumber": "",
//     "resolutionDate": null,
//     "resolutionSubject": "",
//     "resolutionText": "",
//     "category1Id": 27,
//     "category2Id": 34,
//     "category3Id": 0,
//     "resolutionType": "",
//     "resolutionPlace": "",
//     "requiredDocuments": "",
//     "pickupLocation": "",
//     "fees": "",
//     "appealProcedure": "",
//     "comments": "",
//     "legalBasis": "",
//     "resolutionContent": "",
//     "approvedBy": "",
//     "acceptedBy": "Jan Mi\u0139\u009bkiewicz",
//     "isArchived": false,
//     "modifiedAt": {
//       "date": "1970-01-01 01:33:45.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "isDeleted": false,
//     "deletedAt": null,
//     "publishedAt": {
//       "date": "2025-10-24 09:51:54.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "type": "bip_artykuly"
//   },
//   {
//     "id": 203,
//     "categoryId": 74,
//     "title": "Uchwa\u0139\u0082a: 4321a, z dnia: 01.12.2000",
//     "slug": "4321a",
//     "content": "\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003E\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003E\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003E\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E",
//     "createdAt": {
//       "date": "2025-11-06 11:52:44.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "position": 198,
//     "views": 386,
//     "author": "serwis.av1.pl",
//     "status": 1,
//     "startAt": {
//       "date": "2025-11-06 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "endAt": {
//       "date": "2045-11-06 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "producedAt": {
//       "date": "2025-11-06 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "isApproved": true,
//     "userId": "2",
//     "isMain": false,
//     "keywords": "",
//     "articleType": 1,
//     "subtitle": "",
//     "resolutionNumber": "4321a",
//     "resolutionDate": {
//       "date": "2000-12-01 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "resolutionSubject": "w sprawie 1",
//     "resolutionText": "obowiazuje 1",
//     "category1Id": 43,
//     "category2Id": 56,
//     "category3Id": 40,
//     "resolutionType": "",
//     "resolutionPlace": "",
//     "requiredDocuments": "",
//     "pickupLocation": "",
//     "fees": "",
//     "appealProcedure": "",
//     "comments": "",
//     "legalBasis": "",
//     "resolutionContent": "",
//     "approvedBy": "",
//     "acceptedBy": "Jan Mi\u0139\u009bkiewicz",
//     "isArchived": false,
//     "modifiedAt": {
//       "date": "1970-01-01 01:33:45.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "isDeleted": false,
//     "deletedAt": null,
//     "publishedAt": {
//       "date": "2025-11-06 11:54:58.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "type": "bip_uchwaly"
//   },
//   {
//     "id": 181,
//     "categoryId": 58,
//     "title": "Sprawa: Rodzaj sprawy, Miejsce za\u0139\u0082atwienia: Miejsce za\u0139\u0082atwienia sprawy",
//     "slug": "rodzaj-sprawy-3415",
//     "content": "",
//     "createdAt": {
//       "date": "2025-03-06 15:58:08.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "position": 177,
//     "views": 218,
//     "author": "serwis.av1.pl",
//     "status": 1,
//     "startAt": {
//       "date": "2025-03-06 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "endAt": {
//       "date": "2045-03-06 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "producedAt": {
//       "date": "2025-03-06 00:00:00.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "isApproved": true,
//     "userId": "2",
//     "isMain": false,
//     "keywords": "",
//     "articleType": 2,
//     "subtitle": "",
//     "resolutionNumber": "",
//     "resolutionDate": null,
//     "resolutionSubject": "",
//     "resolutionText": "",
//     "category1Id": 0,
//     "category2Id": 0,
//     "category3Id": 0,
//     "resolutionType": "Rodzaj sprawy",
//     "resolutionPlace": "Miejsce za\u0139\u0082atwienia sprawy",
//     "requiredDocuments": "wymagane dok",
//     "pickupLocation": "Miejsce odbioru",
//     "fees": "op\u0139\u0082aty",
//     "appealProcedure": "",
//     "comments": "",
//     "legalBasis": "",
//     "resolutionContent": "",
//     "approvedBy": "",
//     "acceptedBy": "Jan Mi\u0139\u009bkiewicz",
//     "isArchived": false,
//     "modifiedAt": {
//       "date": "1970-01-01 01:33:45.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "isDeleted": false,
//     "deletedAt": null,
//     "publishedAt": {
//       "date": "2025-03-06 15:58:16.000000",
//       "timezone_type": 3,
//       "timezone": "Europe\/Warsaw"
//     },
//     "type": "bip_sprawy"
//   },

// ];

export const exampleEmployees: Employee[] = [
  { id: 1, name: 'Jan Kowalski', position: 'Dyrektor', phone: 123456789, extension: 500, email: 'jan.kowalski@example.com', surname: null },
  { id: 2, name: 'Anna Nowak', position: 'Sekretarz', phone: 234567890, email: 'anna.nowak@example.com', surname: null },
  { id: 3, name: 'Piotr Wiśniewski', position: 'Specjalista ds. administracji', phone: 345678901, email: 'piotr.wisniewski@example.com', surname: null },
  { id: 4, name: 'Ewa Kaczmarek', position: 'Księgowa', phone: 456789012, email: 'ewa.kaczmarek@example.com', surname: null },
  { id: 5, name: 'Tomasz Zieliński', position: 'Radca prawny', phone: 567890123, email: 'tomasz.zielinski@example.com', surname: null },
  { id: 6, name: 'Karolina Lewandowska', position: 'Referent', phone: 678901234, email: 'karolina.lewandowska@example.com', surname: null },
  { id: 7, name: 'Michał Woźniak', position: 'Informatyk', phone: 789012345, email: 'michal.wozniak@example.com', surname: null },
  { id: 8, name: 'Agnieszka Piotrowska', position: 'Asystent', phone: 890123456, email: 'agnieszka.piotrowska@example.com', surname: null },
];

export const attachmentExamples: Document[] = [
  {
    id: 201,
    articleId: 0,
    articleType: 'artspis',
    fileName: 'regulamin-konsultacji',
    extension: 'pdf',
    description: '',
    fullPath: '/dokumenty/regulamin-konsultacji.pdf',
    fileSize: 20480,
    language: 'pl',
    position: 0
  },
  {
    id: 202,
    articleId: 0,
    articleType: 'artspis',
    fileName: 'wzorzec-wniosku',
    extension: 'doc',
    description: '',
    fullPath: '/dokumenty/regulamin-konsultacji.pdf',
    fileSize: 15360,
    language: 'pl',
    position: 0
  }
  ,
  {
    id: 203,
    articleId: 301,
    articleType: 'artspis',
    fileName: 'harmonogram-odbioru-odpadow',
    extension: 'xlsx',
    description: '',
    fullPath: '/dokumenty/regulamin-konsultacji.pdf',
    fileSize: 20480,
    language: 'pl',
    position: 0
  }
]

export const officeDataExample: OfficeData =
{
  name: "Urząd Demonstracyjny",
  NIP: "99 99 99 99",
  REGON: "98 98 9888 9",
  bankAccount: "1111 2222 3333 4444 5555 6666 7777",
  bankName: "Bank Przykładowy S.A.",
  address: "ul. 11 Listopada 6B",
  postalCode: "42-400",
  city: "Zawiercie",
  province: "Śląskie",
  district: "Zawierciański",
  phone: "123-456-789",
  email: "example@alpanet.pl",
  website: "https://www.alpanet.pl"
};

export const openHoursExample: OpenHoursDTO[] = [
  {
    id: 0,
    name: "Poniedziałek",
    slug: "monday",
    startAt: "07:00",
    endAt: "16:00",
    status: 0,
    startM: 420,
    endAtM: 960
  },
  {
    id: 1,
    name: "Wtorek",
    slug: "Tuesday",
    startAt: "08:00",
    endAt: "16:00",
    status: 0,
    startM: 480,
    endAtM: 960
  }, {
    id: 2,
    name: "Środa",
    slug: "Wednesday",
    startAt: "08:00",
    endAt: "16:00",
    status: 0,
    startM: 480,
    endAtM: 960
  }, {
    id: 3,
    name: "Czwartek",
    slug: "thursday",
    startAt: "08:00",
    endAt: "16:00",
    status: 0,
    startM: 480,
    endAtM: 960
  }, {
    id: 4,
    name: "Piątek",
    slug: "friday",
    startAt: "08:00",
    endAt: "13:00",
    status: 0,
    startM: 480,
    endAtM: 780
  }
]

export const ArticlesListExample: Article[] = [
  {
    id: 301,
    slug: 'uchwala-nr-xxiii-145-2025-w-sprawie-przyjecia-programu-wspolpracy-z-organizacjami-pozarzadowymi',
    title: "Uchwała Nr XXIII/145/2025 w sprawie przyjęcia programu współpracy z organizacjami pozarządowymi",
    views: 87,
    producedAt: {
      date: "2025-10-15 00:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    },
    articleType: 1, // uchwała
    subtitle: null,
    acceptedBy: "Przewodniczący Rady Gminy",
    publishedAt: {
      date: "2025-10-18 09:30:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    }
  },
  {
    id: 300,
    slug: 'informacja-o-terminach-przyjmowania-interesantow-w-urzedzie-gminy',
    title: "Informacja o terminach przyjmowania interesantów w Urzędzie Gminy",
    views: 412,
    producedAt: {
      date: "2025-10-10 00:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    },
    articleType: 0,
    subtitle: "Godziny pracy urzędu oraz dyżury kierownictwa",
    acceptedBy: "Sekretarz Gminy",
    publishedAt: {
      date: "2025-10-10 12:15:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    }
  },
  {
    id: 299,
    slug: 'sprawa-wydanie-zaswiadczenia-o-niezaleganiu-w-podatkach-lokalnych',
    title: "Sprawa: wydanie zaświadczenia o niezaleganiu w podatkach lokalnych",
    views: 156,
    producedAt: {
      date: "2025-10-05 00:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    },
    articleType: 2,
    subtitle: "Miejsce załatwienia: Referat Finansowy, pokój nr 12",
    acceptedBy: "Kierownik Referatu Finansowego",
    publishedAt: {
      date: "2025-10-06 08:45:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    }
  },
]

export const ArtilcesExample: Article[] = [
  {
    id: 301,
    categoryId: 70,
    slug: 'uchwala-nr-xxiii-145-2025-w-sprawie-przyjecia-programu-wspolpracy-z-organizacjami-pozarzadowymi',
    title: 'Uchwała Nr XXIII/145/2025 w sprawie przyjęcia programu współpracy z organizacjami pozarządowymi',
    content: '<p>Uchwała określa zasady współpracy gminy z organizacjami pozarządowymi.</p>',
    views: 87,
    author: 'serwis.bip.gov.pl',
    status: 1,
    articleType: 1,
    subtitle: null,

    producedAt: {
      date: '2025-10-15 00:00:00.000000',
      timezone_type: 3,
      timezone: 'Europe/Warsaw'
    },
    publishedAt: {
      date: '2025-10-18 09:30:00.000000',
      timezone_type: 3,
      timezone: 'Europe/Warsaw'
    },

    resolutionNumber: 'XXIII/145/2025',
    resolutionDate: {
      date: '2025-10-15 00:00:00.000000',
      timezone_type: 3,
      timezone: 'Europe/Warsaw'
    },
    resolutionSubject: 'programu współpracy z organizacjami pozarządowymi',
    resolutionText: 'Rady Gminy',
    resolutionType: null,
    resolutionPlace: null,

    requiredDocuments: null,
    pickupLocation: null,
    fees: null,
    appealProcedure: null,
    comments: null,
    legalBasis: null,
    resolutionContent: null,

    acceptedBy: 'Przewodniczący Rady Gminy',
    approvedBy: null,
    documents: [],
    type: 'bip_uchwaly'
  },
  {
    id: 300,
    categoryId: 58,
    slug: 'informacja-o-terminach-przyjmowania-interesantow-w-urzedzie-gminy',
    title: 'Informacja o terminach przyjmowania interesantów w Urzędzie Gminy',
    content: '<p>Podajemy aktualne godziny pracy urzędu.</p>',
    views: 412,
    author: 'serwis.bip.gov.pl',
    status: 1,
    articleType: 0,
    subtitle: 'Godziny pracy urzędu oraz dyżury kierownictwa',

    producedAt: {
      date: '2025-10-10 00:00:00.000000',
      timezone_type: 3,
      timezone: 'Europe/Warsaw'
    },
    publishedAt: {
      date: '2025-10-10 12:15:00.000000',
      timezone_type: 3,
      timezone: 'Europe/Warsaw'
    },

    resolutionNumber: null,
    resolutionDate: null,
    resolutionSubject: null,
    resolutionText: null,
    resolutionType: null,
    resolutionPlace: null,

    requiredDocuments: null,
    pickupLocation: null,
    fees: null,
    appealProcedure: null,
    comments: null,
    legalBasis: null,
    resolutionContent: null,

    acceptedBy: 'Sekretarz Gminy',
    approvedBy: null,
    documents: [],
    type: 'bip_artykuly'
  },
  {
    id: 299,
    categoryId: 38,
    slug: 'sprawa-wydanie-zaswiadczenia-o-niezaleganiu-w-podatkach-lokalnych',
    title: 'Sprawa: wydanie zaświadczenia o niezaleganiu w podatkach lokalnych',
    content: '<p>Procedura uzyskania zaświadczenia.</p>',
    views: 156,
    author: 'serwis.bip.gov.pl',
    status: 1,
    articleType: 2,
    subtitle: 'Miejsce załatwienia: Referat Finansowy, pokój nr 12',

    producedAt: {
      date: '2025-10-05 00:00:00.000000',
      timezone_type: 3,
      timezone: 'Europe/Warsaw'
    },
    publishedAt: {
      date: '2025-10-06 08:45:00.000000',
      timezone_type: 3,
      timezone: 'Europe/Warsaw'
    },

    resolutionNumber: null,
    resolutionDate: null,
    resolutionSubject: null,
    resolutionText: null,
    resolutionType: 'zaświadczenie',
    resolutionPlace: 'Referat Finansowy, pokój nr 12',

    requiredDocuments: 'wniosek\npełnomocnictwo (jeśli dotyczy)',
    pickupLocation: 'Urząd Gminy – kasa',
    fees: '17 zł',
    appealProcedure: 'odwołanie do SKO',
    comments: 'termin realizacji do 7 dni',
    legalBasis: 'Ordynacja podatkowa',
    resolutionContent: 'wydanie zaświadczenia',

    acceptedBy: 'Kierownik Referatu Finansowego',
    approvedBy: null,
    documents: [],
    type: 'bip_sprawy'
  },
  {
    id: 298,
    slug: 'uchwala-nr-xxii-138-2025-w-sprawie-ustalenia-stawek-podatku-od-nieruchomosci-na-rok-2026',
    title: "Uchwała Nr XXII/138/2025 w sprawie ustalenia stawek podatku od nieruchomości na rok 2026",
    views: 231,
    producedAt: {
      date: "2025-09-25 00:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    },
    articleType: 1,
    subtitle: null,
    acceptedBy: "Przewodniczący Rady Gminy",
    publishedAt: {
      date: "2025-09-30 11:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    }
  },
  {
    id: 297,
    slug: 'ogloszenie-o-naborze-na-wolne-stanowisko-urzednicze',
    title: "Ogłoszenie o naborze na wolne stanowisko urzędnicze",
    views: 689,
    producedAt: {
      date: "2025-09-20 00:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    },
    articleType: 0,
    subtitle: "Stanowisko: inspektor ds. administracyjnych",
    acceptedBy: "Kierownik Referatu Organizacyjnego",
    publishedAt: {
      date: "2025-09-20 08:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    }
  },
  {
    id: 296,
    slug: 'sprawa-wpis-do-ewidencji-dzialalnosci-gospodarczej',
    title: "Sprawa: wpis do ewidencji działalności gospodarczej",
    views: 342,
    producedAt: {
      date: "2025-09-18 00:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    },
    articleType: 2,
    subtitle: "Miejsce załatwienia: Referat Spraw Obywatelskich",
    acceptedBy: "Kierownik Referatu Spraw Obywatelskich",
    publishedAt: {
      date: "2025-09-18 09:10:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    }
  },
  {
    id: 295,
    slug: 'informacja-o-planowanych-przerwach-w-dostawie-wody',
    title: "Informacja o planowanych przerwach w dostawie wody",
    views: 514,
    producedAt: {
      date: "2025-09-12 00:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    },
    articleType: 0,
    subtitle: "Dotyczy miejscowości: Brzeziny, Nowa Wieś",
    acceptedBy: "Referat Gospodarki Komunalnej",
    publishedAt: {
      date: "2025-09-12 07:30:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    }
  },
  {
    id: 294,
    slug: 'uchwala-nr-xxi-130-2025-w-sprawie-nadania-statutu-gminnemu-osrodkowi-kultury',
    title: "Uchwała Nr XXI/130/2025 w sprawie nadania statutu Gminnemu Ośrodkowi Kultury",
    views: 164,
    producedAt: {
      date: "2025-09-01 00:00:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    },
    articleType: 1,
    subtitle: null,
    acceptedBy: "Przewodniczący Rady Gminy",
    publishedAt: {
      date: "2025-09-03 10:20:00.000000",
      timezone_type: 3,
      timezone: "Europe/Warsaw"
    }
  }
]

