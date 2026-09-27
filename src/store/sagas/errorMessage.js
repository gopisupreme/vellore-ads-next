/** Readable message from an axios error: the PHP API's { error } if it sent one. */
export function errorMessage(e) {
  return e.response?.data?.error || e.message;
}
