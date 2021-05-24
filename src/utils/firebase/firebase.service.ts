import { Injectable } from '@nestjs/common';

import admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../../firebase-credential.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nest-library.firebaseio.com',
});

@Injectable()
export class FirebaseService {
  public db = admin.firestore();
}
