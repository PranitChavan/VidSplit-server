import { StorageError } from '@supabase/storage-js';

export class SupabaseStorageExceptions extends StorageError {
  constructor(public message: string) {
    super(message);
  }
}
