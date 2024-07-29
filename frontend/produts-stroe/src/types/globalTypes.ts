export type Headers = Record<string, string | string[]>;

export interface AddProductFunctionObject {
    entityData: FormData;
    headers: Headers
}