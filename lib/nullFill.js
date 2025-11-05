// lib/nullFill.js

/**
 * Default text for true null values.
 */
export const DEFAULT_NULL_TEXT = "Data publicly not available"

/**
 * Outlier definitions (sparse matrix)
 * Key format: `${bankName || brokerName}-${columnName}`
 * Values: custom outlier text overrides for specific cells
 */
export const outliers = {
  las: {
    "TATA Capital-regularization_period" : "At discretion of TATA Capital"
  },
  lamf: {
    "ICICI-ltv": "LTV values depend on AMC policies",
    "SBI-interest_rate": "Dynamic rate based on MF category",
  },
  mtf: {
    "Zerodha-interest_slabs": "Broker does not disclose slab breakdowns",
    "Groww-auto_square_off": "Auto square-off charges vary per order type",
  },
}

/**
 * Returns the proper text for null cells based on outlier existence.
 * If an outlier exists for the given key, returns it;
 * otherwise returns the default null text.
 * @param {string} table - Table name ('las', 'lamf', 'mtf')
 * @param {string} rowKey - bank/institution/broker name (string)
 * @param {string} columnName - Column name (string)
 * @returns {string} - Outlier message or default null text
 */

export function getNullFill(table, rowKey, columnName) {
  if (!table || !rowKey || !columnName) return DEFAULT_NULL_TEXT
  const key = `${rowKey}-${columnName}`
  const tableOutliers = outliers[table] || {}
  return tableOutliers[key] || DEFAULT_NULL_TEXT
}