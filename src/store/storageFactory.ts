import { BrowserStorage } from './browserStorage';
import { IStoreable } from './IStoreable';

export abstract class StorageFactory {
    private static nameToClass: Record<string, any> = {
        browser: BrowserStorage,
    };

    static create(storeType: string): IStoreable {

        if(StorageFactory.nameToClass[storeType] === undefined){
            throw new Error("Store type not found not supported yet");
        }

        return new StorageFactory.nameToClass[storeType]();
    }
}
