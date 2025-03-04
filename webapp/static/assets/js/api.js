'use strict'
/* global location */

/*
 * Copyright (C) 2023  ANSSI
 * SPDX-License-Identifier: GPL-3.0-only
 */

/**
 * API client
 */
export default class Api {
  /**
   * Call API to get flows, application protocols list and tags
   *
   * API limits results to 100 entries.
   *
   * @param {Number} timestampFrom Keep only flows after this timestamp
   * @param {Number} timestampTo Keep only flows before this timestamp
   * @param {Array} services Keep only flows matching these IP address and ports
   * @param {String} appProto Keep only flows matching this app-layer protocol
   * @param {Array} tags Keep only flows matching these tags
   */
  async listFlows (timestampFrom, timestampTo, services, appProto, tags) {
    const url = new URL(`${location.origin}${location.pathname}api/flow`)
    if (typeof timestampFrom === 'number') {
      url.searchParams.append('from', timestampFrom)
    }
    if (typeof timestampTo === 'number') {
      url.searchParams.append('to', timestampTo)
    }
    services?.forEach((s) => {
      url.searchParams.append('service', s)
    })
    if (appProto) {
      url.searchParams.append('app_proto', appProto)
    }
    tags?.forEach((t) => {
      url.searchParams.append('tag', t)
    })
    const response = await fetch(url.href, {})
    if (!response.ok) {
      throw Error('failed to list flows')
    }

    const data = await response.json()
    return data
  }

  /**
   * Call API to get flow details from identifier
   *
   * @param {Number} flowId Flow identifier
   */
  async getFlow (flowId) {
    const response = await fetch(`api/flow/${flowId}`, {})
    if (!response.ok) {
      throw Error('failed to get flow')
    }

    const data = await response.json()
    return data
  }

  /**
   * Call API to get flow raw data from identifier
   *
   * @param {Number} flowId Flow identifier
   */
  async getFlowRaw (flowId) {
    const response = await fetch(`api/flow/${flowId}/raw`, {})
    if (!response.ok) {
      throw Error('failed to get flow raw data')
    }

    const data = await response.json()
    return data
  }
}
