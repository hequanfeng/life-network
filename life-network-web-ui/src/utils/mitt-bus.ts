import mitt from 'mitt'

export type MittBusEvents = {
  refresh: any
  setSuccessInfo: string
}

/**
 * mitt cross component communication
 */
export const emitter = mitt<MittBusEvents>()
