const  WorkflowDiagram={
  "phase": "🏁 After Sales Closure",
  "children": [
    {
      "name": "📦 Project ID",
      "estimate": "100 tons",
      "children": [
        {
          "name": "🔢 112–120 SKUs",
          "children": [
            {
              "name": "📊 Project Management Control (1 Human)",
              "children": [
                {
                  "name": "🛠 Design Engineering (1 Human - A)",
                  "children": [
                    {
                      "name": "📄 Estimate",
                      "access": "public"
                    },
                    {
                      "name": "📐 Anchor Bolt Plant",
                      "access": "public",
                      "children": [
                        {
                          "name": "📉 Column Reaction",
                          "access": "restricted",
                          "children": [
                            {
                              "name": "📂 Design Data Connection",
                              "access": "restricted",
                              "children": [
                                {
                                  "name": "📈 Quantity (STAAD - pmc.STD)",
                                  "access": "restricted",
                                  "children": [
                                    {
                                      "name": "📋 Material Take Off / BOM",
                                      "access": "restricted",
                                      "children": [
                                        {
                                          "name": "🗺 GAD",
                                          "access": "public"
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "🔁 Anchor Bolt Revisions",
                      "note": "R0 → R1…",
                      "children": [
                        {
                          "name": "⚠️ Trigger: Client uploads commented CSV/CAD only"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "🧱 Detail Engineering (1 Human - B)",
                  "children": [
                    {
                      "name": "🧲 Tekla File (.ifc/.dxf)",
                      "access": "restricted"
                    },
                    {
                      "name": "📄 Detailed GAD",
                      "access": "public"
                    },
                    {
                      "name": "🏗 Shop/Fabrication Drawings",
                      "access": "restricted"
                    },
                    {
                      "name": "📦 Erection Drawing + Sequence List",
                      "access": "restricted"
                    },
                    {
                      "name": "🧾 Sheeting Drawing",
                      "access": "restricted"
                    },
                    {
                      "name": "📋 BOM",
                      "access": "restricted"
                    }
                  ]
                },
                {
                  "name": "✂️ Nesting (1 Human - C)",
                  "children": [
                    {
                      "name": "🧾 Nesting (.DXF + PDF)"
                    },
                    {
                      "name": "📊 Raw Material List (PDF/CSV)"
                    },
                    {
                      "name": "🔍 Off-cut Details (PDF/CSV)"
                    }
                  ]
                },
                {
                  "name": "🔍 Quality (1 Human - E) & Production (1 Human - F)",
                  "children": [
                    {
                      "name": "🧪 NDT & Raw Material Reports"
                    },
                    {
                      "name": "✂️ Cutting Report"
                    },
                    {
                      "name": "🔩 Welding Report"
                    },
                    {
                      "name": "🧱 Built-Up Report"
                    },
                    {
                      "name": "🪓 Grinding & Finishing Report"
                    },
                    {
                      "name": "💨 Blasting Report"
                    },
                    {
                      "name": "🎨 Paint Report"
                    }
                  ]
                },
                {
                  "name": "🚚 Logistics 1 (1 Human - H)",
                  "note": "Flow: Purchase → Production → Project Manager"
                },
                {
                  "name": "🚚 Logistics 2 (1 Human - I)",
                  "note": "Flow: Production → Project Manager"
                },
                {
                  "name": "🧑‍💼 Project Manager (Onsite) (1 Human - G)",
                  "children": [
                    {
                      "name": "📊 Leveling of Anchor Bolt Report"
                    },
                    {
                      "name": "🪜 Plumbing of Anchor Bolt Report"
                    },
                    {
                      "name": "🧱 Leveling of Column Report"
                    },
                    {
                      "name": "🚿 Plumbing of Column Report"
                    },
                    {
                      "name": "📦 Material Receiving Report / Assembly List"
                    },
                    {
                      "name": "🔩 Torque Report"
                    }
                  ]
                }
              ]
            },
            {
              "name": "🛒 Purchase (2 Humans)",
              "children": [
                {
                  "name": "🔩 Primary Plates",
                  "note": "Bill + Test Certs"
                },
                {
                  "name": "🔧 Welding Consumables"
                },
                {
                  "name": "🎨 Paint"
                },
                {
                  "name": "🧱 Secondary Members"
                },
                {
                  "name": "🧰 Sheeting & Accessories"
                }
              ]
            },
            {
              "name": "💰 Accounts (3 Humans)",
              "children": [
                {
                  "name": "📑 Client Quotation",
                  "access": "public"
                },
                {
                  "name": "📄 PO from Client",
                  "access": "public"
                },
                {
                  "name": "📃 Vendor Quotations",
                  "note": "Min 3"
                },
                {
                  "name": "✅ PO Release to Vendor",
                  "access": "public"
                },
                {
                  "name": "💵 Payment to Vendors & Employees"
                },
                {
                  "name": "🧾 Payment Collection from Client"
                }
              ]
            },
            {
              "name": "📚 DOSSIER",
              "children": [
                {
                  "name": "Public Files",
                  "access": "public"
                },
                {
                  "name": "Authorized Files",
                  "access": "restricted"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}



export default WorkflowDiagram;