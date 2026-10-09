export interface BlogCategory {
id: number;
name: string;
slug: string;
active: boolean;
createdAt: string;
updatedAt: string;
}

export interface BlogCategoryRequest {
name: string;
slug: string;
active: boolean;
}
