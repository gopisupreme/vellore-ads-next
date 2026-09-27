/**
 * The home page category strip and its drop-down panels, from the PHP site's
 * views/pages/top_catagories.php. Tiles with a `href` link straight there;
 * the others open their panel. In a panel column a string is a service
 * (it searches the city for it), {heading} and {subheading} are titles.
 */

export const CATEGORY_TILES = [
  {
    "key": "home_office",
    "label": "Home & Office",
    "image": "assets/images/office.webp"
  },
  {
    "key": "job",
    "label": "Job Search",
    "image": "assets/images/icon/jobicon.png",
    "href": "job"
  },
  {
    "key": "home_improvement",
    "label": "Home Improvement",
    "image": "assets/images/home-improvement.webp"
  },
  {
    "key": "education_training",
    "label": "Education & Training",
    "image": "assets/images/educatio_traning.webp"
  },
  {
    "key": "properties_rentals",
    "label": "Properties & Rentals",
    "image": "assets/images/home-icon.webp"
  },
  {
    "key": "professional_services",
    "label": "Professional Services",
    "image": "assets/images/professional.webp"
  },
  {
    "key": "travel_transport",
    "label": "Travel & Transport",
    "image": "assets/images/travel-bag.webp"
  },
  {
    "key": "health_wellness",
    "label": "Health & Wellness",
    "image": "assets/images/health.webp"
  },
  {
    "key": "events_tab",
    "label": "Events",
    "image": "assets/images/event.webp"
  }
];

export const CATEGORY_PANELS = {
  "home_office": [
    {
      "tab": "Home Appliance Dealers",
      "columns": [
        [
          {
            "heading": "Home & Office Product Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers",
          "Online UPS Dealers",
          "Washing machine dealers",
          "Photocopier Dealers"
        ],
        [
          "Music System Dealers",
          "Projector Dealers",
          "Satellite TV Dealers",
          "TV Dealers",
          "Bean Bag Dealers",
          "EPABX Dealers",
          "Generators Dealers",
          "Industrial Voltage Stabilizers Dealers",
          "Online UPS Dealers",
          "Washing machine dealers",
          "Photocopier Dealers"
        ],
        [
          "Sign Board Agencies",
          "Gas Geyser Dealers",
          "Gas Water Heater Dealers",
          "UPS Dealers",
          "Water Purifier Dealers",
          {
            "subheading": "Kitchen Appliances"
          },
          "Dishwasher Dealers",
          "Flask Dealers",
          "Gas Stove Dealers",
          "Induction Stove Dealers",
          "Microwave Oven Dealers"
        ]
      ]
    },
    {
      "tab": "Home / Office Services",
      "columns": [
        [
          {
            "heading": "Home & Office Product Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Home / Office Products",
      "columns": [
        [
          {
            "heading": "Home & Office Product Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    }
  ],
  "education_training": [
    {
      "tab": "Education",
      "columns": [
        [
          {
            "heading": "Competitive Exams Coaching"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Training",
      "columns": [
        [
          {
            "heading": "Accounts & Finance Coaching"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Job Training",
      "columns": [
        [
          {
            "heading": "Computer Training"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    }
  ],
  "home_improvement": [
    {
      "tab": "Home Improvement",
      "columns": [
        [
          {
            "heading": "Home & Office Product Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    }
  ],
  "properties_rentals": [
    {
      "tab": "Properties Rentals",
      "columns": [
        [
          {
            "heading": "Home & Office Product Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    }
  ],
  "professional_services": [
    {
      "tab": "Professional Services",
      "columns": [
        [
          {
            "heading": "Professional Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Personal Services",
      "columns": [
        [
          {
            "heading": "Personal Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    }
  ],
  "travel_transport": [
    {
      "tab": "Travel Agents",
      "columns": [
        [
          {
            "heading": "Travel Agents"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Tour Operators",
      "columns": [
        [
          {
            "heading": "Hotels"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Hotels",
      "columns": [
        [
          {
            "heading": "Personal Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    }
  ],
  "health_wellness": [
    {
      "tab": "Clinics & Doctors",
      "columns": [
        [
          {
            "heading": "Clinics & Doctors"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Health Services",
      "columns": [
        [
          {
            "heading": "Health Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Hospitals & Medical Centres",
      "columns": [
        [
          {
            "heading": "Hospitals Medical Centres"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    }
  ],
  "events_tab": [
    {
      "tab": "Event Organisers",
      "columns": [
        [
          {
            "heading": "Event Organisers"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Corporate Parties",
      "columns": [
        [
          {
            "heading": "Corporate Parties"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    },
    {
      "tab": "Party Services",
      "columns": [
        [
          {
            "heading": "Party Services"
          },
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ],
        [
          "AC Dealers",
          "Air Cooler Dealers",
          "Air Purifier Dealers",
          "Exhaust Fan Dealers",
          "Audio Visual Equipment Dealers",
          "DVD Player Dealers",
          "Home Theatre Dealers",
          "iPad Dealers"
        ]
      ]
    }
  ]
};
