import { Attachment } from "@/types/Attachment";
import { Article } from "@/types/Article";
import { Employee } from "@/types/Employee";

export const FAKE_CITIES = [
  { id: '1', code: '42100', name: 'Gmina Testowa' },
  { id: '2', code: '42300', name: 'Gmina Testowo' },
  { id: '3', code: '42400', name: 'Gmina Test' },
  { id: '4', code: '42400', name: 'Gmina Test 2' },
  { id: '5', code: '42400', name: 'Gmina Test 3' },
  { id: '6', code: '42200', name: 'Gmina Testowska' },
  { id: '7', code: '42500', name: 'Gmina Testowadło' },
];

export const articles_examples_full: Article[] = [
  {
    "id": 199,
    "categoryId": 58,
    "title": "Lorem ipsum dolor sit amet",
    "slug": "lorem-ipsum-dolor-sit-amet-2410",
    "content": "\u003Cp\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio a magna molestie vulputate. Quisque mauris metus, laoreet vitae metus sit amet, gravida ultrices urna. Phasellus at commodo nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi vel libero ultricies, eleifend eros sit amet, rutrum lorem. Cras a consectetur urna, et rutrum sem. In auctor accumsan faucibus. Duis varius facilisis feugiat. In in enim sed eros hendrerit vulputate vitae quis metus. Ut urna ex, luctus ac egestas sit amet, accumsan et nisl. Maecenas posuere nisl augue, vitae tincidunt quam aliquam vel. Integer sodales dolor a quam suscipit faucibus. Nam iaculis diam sed ante maximus, quis pharetra sapien interdum. Fusce at bibendum nunc, sed suscipit neque. Praesent in velit massa. Ut rutrum nunc a ex blandit dapibus.\u0026#160;\u003C\/p\u003E\r\n\u003Cp\u003EWersja 7\u003C\/p\u003E",
    "createdAt": {
      "date": "2025-10-24 09:51:42.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "position": 195,
    "views": 773,
    "author": "serwis.av1.pl",
    "status": 1,
    "startAt": {
      "date": "2025-10-24 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "endAt": {
      "date": "2045-10-24 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "producedAt": {
      "date": "2025-10-24 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "isApproved": true,
    "userId": "2",
    "isMain": false,
    "keywords": "",
    "articleType": 0,
    "subtitle": "Praesent a odio a magna molestie vulputate. Quisque mauris metus, laoreet vitae metus sit amet, gravida ultrices urna.",
    "resolutionNumber": "",
    "resolutionDate": null,
    "resolutionSubject": "",
    "resolutionText": "",
    "category1Id": 27,
    "category2Id": 34,
    "category3Id": 0,
    "resolutionType": "",
    "resolutionPlace": "",
    "requiredDocuments": "",
    "pickupLocation": "",
    "fees": "",
    "appealProcedure": "",
    "comments": "",
    "legalBasis": "",
    "resolutionContent": "",
    "approvedBy": "",
    "acceptedBy": "Jan Mi\u0139\u009bkiewicz",
    "isArchived": false,
    "modifiedAt": {
      "date": "1970-01-01 01:33:45.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "isDeleted": false,
    "deletedAt": null,
    "publishedAt": {
      "date": "2025-10-24 09:51:54.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "type": "bip_artykuly"
  },
  {
    "id": 203,
    "categoryId": 74,
    "title": "Uchwa\u0139\u0082a: 4321a, z dnia: 01.12.2000",
    "slug": "4321a",
    "content": "\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003E\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003E\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221494\u0022 data-end=\u00221661\u0022\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis felis vitae metus fermentum feugiat. Donec ornare erat in erat blandit, non commodo eros egestas.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003EPraesent porta purus non nisl euismod, vel viverra arcu tincidunt. Integer vel ligula a mi viverra egestas. Ut nec nibh ultricies, feugiat justo non, lobortis magna.\u003C\/p\u003E\r\n\u003Cp data-start=\u00221663\u0022 data-end=\u00221830\u0022\u003E\u003C\/p\u003E\r\n\u003Cp data-start=\u00221832\u0022 data-end=\u00222083\u0022\u003ESuspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Mauris ut dui vitae est tempus posuere. Cras gravida, velit eget lacinia consequat, sem elit efficitur purus, ut posuere mi turpis a mauris.\u003C\/p\u003E\r\n\u003Cp data-start=\u00222085\u0022 data-end=\u00222241\u0022\u003EDonec mollis odio sed dui malesuada ultricies. Etiam a leo at magna fringilla cursus. Vivamus vulputate quam et nisi aliquet, et bibendum ipsum malesuada.\u003C\/p\u003E",
    "createdAt": {
      "date": "2025-11-06 11:52:44.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "position": 198,
    "views": 386,
    "author": "serwis.av1.pl",
    "status": 1,
    "startAt": {
      "date": "2025-11-06 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "endAt": {
      "date": "2045-11-06 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "producedAt": {
      "date": "2025-11-06 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "isApproved": true,
    "userId": "2",
    "isMain": false,
    "keywords": "",
    "articleType": 1,
    "subtitle": "",
    "resolutionNumber": "4321a",
    "resolutionDate": {
      "date": "2000-12-01 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "resolutionSubject": "w sprawie 1",
    "resolutionText": "obowiazuje 1",
    "category1Id": 43,
    "category2Id": 56,
    "category3Id": 40,
    "resolutionType": "",
    "resolutionPlace": "",
    "requiredDocuments": "",
    "pickupLocation": "",
    "fees": "",
    "appealProcedure": "",
    "comments": "",
    "legalBasis": "",
    "resolutionContent": "",
    "approvedBy": "",
    "acceptedBy": "Jan Mi\u0139\u009bkiewicz",
    "isArchived": false,
    "modifiedAt": {
      "date": "1970-01-01 01:33:45.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "isDeleted": false,
    "deletedAt": null,
    "publishedAt": {
      "date": "2025-11-06 11:54:58.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "type": "bip_uchwaly"
  },
  {
    "id": 181,
    "categoryId": 58,
    "title": "Sprawa: Rodzaj sprawy, Miejsce za\u0139\u0082atwienia: Miejsce za\u0139\u0082atwienia sprawy",
    "slug": "rodzaj-sprawy-3415",
    "content": "",
    "createdAt": {
      "date": "2025-03-06 15:58:08.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "position": 177,
    "views": 218,
    "author": "serwis.av1.pl",
    "status": 1,
    "startAt": {
      "date": "2025-03-06 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "endAt": {
      "date": "2045-03-06 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "producedAt": {
      "date": "2025-03-06 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "isApproved": true,
    "userId": "2",
    "isMain": false,
    "keywords": "",
    "articleType": 2,
    "subtitle": "",
    "resolutionNumber": "",
    "resolutionDate": null,
    "resolutionSubject": "",
    "resolutionText": "",
    "category1Id": 0,
    "category2Id": 0,
    "category3Id": 0,
    "resolutionType": "Rodzaj sprawy",
    "resolutionPlace": "Miejsce za\u0139\u0082atwienia sprawy",
    "requiredDocuments": "wymagane dok",
    "pickupLocation": "Miejsce odbioru",
    "fees": "op\u0139\u0082aty",
    "appealProcedure": "",
    "comments": "",
    "legalBasis": "",
    "resolutionContent": "",
    "approvedBy": "",
    "acceptedBy": "Jan Mi\u0139\u009bkiewicz",
    "isArchived": false,
    "modifiedAt": {
      "date": "1970-01-01 01:33:45.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "isDeleted": false,
    "deletedAt": null,
    "publishedAt": {
      "date": "2025-03-06 15:58:16.000000",
      "timezone_type": 3,
      "timezone": "Europe\/Warsaw"
    },
    "type": "bip_sprawy"
  },

];

export const exampleEmployees: Employee[] = [
  { id: 1, fullName: 'Jan Kowalski', function: 'Dyrektor', phone: 123456789, phone_2: 500, email: 'jan.kowalski@example.com' },
  { id: 2, fullName: 'Anna Nowak', function: 'Sekretarz', phone: 234567890, email: 'anna.nowak@example.com' },
  { id: 3, fullName: 'Piotr Wiśniewski', function: 'Specjalista ds. administracji', phone: 345678901, email: 'piotr.wisniewski@example.com' },
  { id: 4, fullName: 'Ewa Kaczmarek', function: 'Księgowa', phone: 456789012, email: 'ewa.kaczmarek@example.com' },
  { id: 5, fullName: 'Tomasz Zieliński', function: 'Radca prawny', phone: 567890123, email: 'tomasz.zielinski@example.com' },
  { id: 6, fullName: 'Karolina Lewandowska', function: 'Referent', phone: 678901234, email: 'karolina.lewandowska@example.com' },
  { id: 7, fullName: 'Michał Woźniak', function: 'Informatyk', phone: 789012345, email: 'michal.wozniak@example.com' },
  { id: 8, fullName: 'Agnieszka Piotrowska', function: 'Asystent', phone: 890123456, email: 'agnieszka.piotrowska@example.com' },
  { id: 9, fullName: 'Agnieszka Piotrowska', function: 'Asystent', phone: 890123456, email: 'agnieszka.piotrowska@example.com' },
  { id: 10, fullName: 'Agnieszka Piotrowska', function: 'Asystent', phone: 890123456, email: 'agnieszka.piotrowska@example.com' },
  { id: 11, fullName: 'Agnieszka Piotrowska', function: 'Asystent', phone: 890123456, email: 'agnieszka.piotrowska@example.com' },
  { id: 12, fullName: 'Agnieszka Piotrowska', function: 'Asystent', phone: 890123456, email: 'agnieszka.piotrowska@example.com' },
];

export const attachmentExamples: Attachment[] = [
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
]



