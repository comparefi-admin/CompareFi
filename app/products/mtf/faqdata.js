export const faqData = {
  "Basics": [
    {
      q: "What is Margin Trading Facility (MTF)?",
      a: "MTF lets you buy approved stocks by paying only a fraction of the total value upfront. The broker funds the balance, and you pay daily interest on the funded amount until you sell or convert to delivery."
    },
    {
      q: "How is MTF different from LAS or LAMF?",
      a: "MTF funding is strictly for buying approved equities/ETFs; shares are pledged under SEBI’s pledge/re-pledge system. LAS/LAMF are loans against existing shares or MF units for any non-speculative purpose."
    },
    {
      q: "Which stocks are eligible for MTF?",
      a: "Only Group-1 equities and select ETFs approved by exchanges and brokers. Lists are updated periodically."
    },
    {
      q: "Do I own the shares in MTF?",
      a: "Yes, shares are bought in your demat account and pledged (not transferred) via the depository pledge/re-pledge mechanism."
    }
  ],

  "Funding Mechanics": [
    {
      q: "How much margin do I need initially?",
      a: "SEBI mandates upfront margin: Group-1 F&O stocks: VaR + 3×ELM; Other Group-1 stocks: VaR + 5×ELM. Margin can be cash or approved securities with haircuts."
    },
    {
      q: "What is maintenance margin?",
      a: "The ongoing margin you must maintain post-purchase. If prices fall or VAR/ELM rises, margin shortfall triggers a margin call."
    },
    {
      q: "How is funding amount decided?",
      a: "Funding equals trade value minus your margin. As prices move, funded portion and required margin are re-evaluated daily."
    },
    {
      q: "Can I pledge existing holdings instead of cash?",
      a: "Yes, approved stocks can be pledged for margin with haircuts."
    }
  ],

  "Cost Components": [
    {
      q: "How is interest calculated?",
      a: "Interest accrues daily on funded amount and is billed monthly. Rates vary by broker, typically 9.5%–15%+ p.a."
    },
    {
      q: "What costs apply besides interest?",
      a: "Brokerage, pledge/unpledge charges, DP charges, auto square-off fees, and platform fees may apply."
    },
    {
      q: "Are there hidden charges?",
      a: "No hidden charges if disclosed; check broker’s tariff for GST, STT, stamp duty, and pledge costs."
    },
    {
      q: "How is interest billed?",
      a: "Interest accrues daily and is debited monthly or as per broker’s cycle."
    }
  ],

  "Holding & Conversion": [
    {
      q: "How long can I hold MTF positions?",
      a: "Broker-specific: some allow unlimited holding subject to margin; others cap at 90–365 days."
    },
    {
      q: "Can I convert MTF to delivery?",
      a: "Yes, by paying the funded amount and clearing interest dues before the broker’s cut-off."
    },
    {
      q: "What happens if I sell pledged shares?",
      a: "Broker will unpledge and adjust loan first; interest stops after settlement."
    }
  ],

  "Risk FAQs": [
    {
      q: "What triggers a margin call?",
      a: "Price drop causing margin shortfall, increased VAR/ELM, or collateral value erosion."
    },
    {
      q: "What happens if I ignore a margin call?",
      a: "Broker’s RMS will auto square-off positions to recover dues."
    },
    {
      q: "What are auto square-off rules?",
      a: "Margin shortfall unresolved within 3–5 days, large MTM losses, or stock exits Group-1."
    },
    {
      q: "How does leverage amplify risk?",
      a: "Losses scale up with borrowed funds. A 10% price drop can wipe out your margin and trigger liquidation."
    }
  ],

  "Corporate Actions": [
    {
      q: "Do I get dividends and bonuses on pledged shares?",
      a: "Yes, dividends are credited to your bank account. For bonuses/splits, brokers may require full payment before record date."
    },
    {
      q: "Rights issues and mergers?",
      a: "You must convert to delivery before record date to participate."
    }
  ],

  "Operational Risks": [
    {
      q: "What if I fail to authorize pledge?",
      a: "Your order may convert to normal delivery requiring full payment or get squared off with penalty."
    },
    {
      q: "Can pledged stocks be misused?",
      a: "No, SEBI’s pledge/re-pledge system ensures shares stay in your demat; brokers cannot transfer ownership."
    }
  ],

  "Best Practices": [
    {
      q: "How to reduce MTF risk?",
      a: "Maintain buffer margin, avoid illiquid stocks, track margin calls daily, and exit before corporate action deadlines."
    },
    {
      q: "Who should use MTF?",
      a: "Experienced investors who manage margin discipline and want short-to-medium-term funding for delivery buys in high-liquidity stocks."
    }
  ],

  "Tax & Compliance": [
    {
      q: "Is interest on MTF tax-deductible?",
      a: "For business traders, yes (as expense). For individuals, it adds to cost of acquisition for capital gains."
    },
    {
      q: "How are gains taxed when I sell funded shares?",
      a: "Capital gains apply like regular delivery trades. Interest and fees affect net returns but not the reported sale consideration."
    }
  ]
};
