'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './index';

/** Makes the Redux store available to every Client Component below it. */
export default function StoreProvider({ children }) {
  // lazy initializer: the store is made once per mount, not on every render
  const [store] = useState(makeStore);
  return <Provider store={store}>{children}</Provider>;
}
