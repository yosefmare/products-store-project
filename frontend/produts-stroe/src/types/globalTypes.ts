export type Headers = Record<string, string | string[]>;

export interface AddProductFunctionObject {
    productData: FormData;
    headers: Headers
}