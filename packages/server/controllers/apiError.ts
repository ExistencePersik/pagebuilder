class ApiError extends Error {

  constructor(status: number, message: string) {
    super()
    this.status = status
    this.message = message
  }

  static badRequest(message: string){
    return new ApiError(400, message)
  }

  static internalError(message: string){
    return new ApiError(500, message)
  }

  static forbidden(message: string){
    return new ApiError(403, message)
  }

}

export default ApiError
