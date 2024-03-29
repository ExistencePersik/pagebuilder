export interface IElementsState {
	elements: {
		[key: string]: IElement[]
	}
	current: IElement['subject']['html'][]
	editing: IElement['subject']['html'][]
	isLoading: boolean
	addedImages: string | undefined
}

export interface IElement {
	id?: number
	name: string
	subject: {
		name: string
		cover: string
		images: {
			[key: string]: string
		}
		html: string
	}
}

export interface IUserState {
	user: IUser
	isAuth: boolean
	isLoginError: string | undefined
	isSignUpError: string | undefined
	isLoading: boolean
	userPages: { id: number; pageInfo: string; createdAt: string }[]
	userPageId: number
}

export interface IUser {
	id: number
	email: string
	role: string
}

export type FormValues = {
	name: string
	cover: string
	html: string
}
