
const base = (size : number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

export const DashboardIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <path
      d="M4.5 10.2L12 4L19.5 10.2V18.5C19.5 19.6 18.6 20.5 17.5 20.5H6.5C5.4 20.5 4.5 19.6 4.5 18.5V10.2Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9.5 15.5H12.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);
 
export const AnalyticsIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <circle cx="4.5" cy="17.5" r="1.5" stroke={color} strokeWidth={strokeWidth} />
    <rect x="10" y="10" width="3.4" height="10" rx="1.2" stroke={color} strokeWidth={strokeWidth} />
    <rect x="17" y="4" width="3.4" height="16" rx="1.2" stroke={color} strokeWidth={strokeWidth} />
  </svg>
);
 
export const TrackingIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <rect x="3" y="10.5" width="10" height="9" rx="1.4" stroke={color} strokeWidth={strokeWidth} />
    <path d="M3 15H13" stroke={color} strokeWidth={strokeWidth} />
    <path
      d="M14 8.2C14 6.15 15.66 4.5 17.7 4.5C19.74 4.5 21.4 6.15 21.4 8.2C21.4 10.6 17.7 14 17.7 14C17.7 14 14 10.6 14 8.2Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <circle cx="17.7" cy="8.2" r="1.2" stroke={color} strokeWidth={strokeWidth} />
    <path d="M20.3 16.5V17.5C20.3 18.6 19.4 19.5 18.3 19.5H15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);
 
export const CustomerIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth={strokeWidth} />
    <path
      d="M4.5 20C5.3 16.2 8.3 14 12 14C15.7 14 18.7 16.2 19.5 20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);
 
export const ClientsIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <circle cx="8.5" cy="8" r="3" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="16" cy="9" r="2.4" stroke={color} strokeWidth={strokeWidth} />
    <path
      d="M2.8 19.5C3.6 16.1 6 14.2 8.5 14.2C11 14.2 13.2 16.1 14 19.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M14.5 15C17.2 15 19.5 16.6 20.4 19.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);
 
export const CompaniesIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <path d="M3.5 10L12 4L20.5 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 9V19.5C5 20.05 5.45 20.5 6 20.5H18C18.55 20.5 19 20.05 19 19.5V9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 6.3V8.3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M13.5 6.3V8.3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <rect x="8" y="12.5" width="8" height="8" rx="0.8" stroke={color} strokeWidth={strokeWidth} />
    <path d="M8 15.2H16" stroke={color} strokeWidth={strokeWidth} />
    <path d="M8 17.7H16" stroke={color} strokeWidth={strokeWidth} />
  </svg>
);
 
export const AttendanceIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <rect x="3" y="5" width="18" height="15" rx="2" stroke={color} strokeWidth={strokeWidth} />
    <path d="M3 9.5H21" stroke={color} strokeWidth={strokeWidth} />
    <path d="M8 8.5V4.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M16 8.5V4.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8.5 13H8.51" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    <path d="M12 13H12.01" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    <path d="M15.5 13H15.51" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    <path d="M8.5 16.5H8.51" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    <path d="M12 16.5H12.01" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    <path d="M15.5 16.5H15.51" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </svg>
);
 
export const MessageIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <path
      d="M21 12C21 16.4 16.97 20 12 20C10.9 20 9.85 19.82 8.88 19.5L4 20.5L5.5 16.7C4.55 15.4 4 13.77 4 12C4 7.58 8.03 4 13 4C17.97 4 21 7.58 21 12Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path d="M8.5 10.8H16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8.5 14H13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);
 
export const SettingsIcon = ({ color = "currentColor", size = 22, strokeWidth = 1.8, ...props }) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="12" r="3.2" stroke={color} strokeWidth={strokeWidth} />
    <path
      d="M19.4 13.5C19.5 13 19.6 12.5 19.6 12C19.6 11.5 19.5 11 19.4 10.5L21.3 9C21.5 8.9 21.5 8.6 21.4 8.4L19.6 5.3C19.5 5.1 19.2 5 19 5.1L16.8 6C16.3 5.6 15.8 5.3 15.2 5.1L14.9 2.7C14.9 2.5 14.7 2.3 14.4 2.3H9.6C9.3 2.3 9.1 2.5 9.1 2.7L8.8 5.1C8.2 5.3 7.7 5.6 7.2 6L5 5.1C4.8 5 4.5 5.1 4.4 5.3L2.6 8.4C2.5 8.6 2.5 8.9 2.7 9L4.6 10.5C4.5 11 4.4 11.5 4.4 12C4.4 12.5 4.5 13 4.6 13.5L2.7 15C2.5 15.1 2.5 15.4 2.6 15.6L4.4 18.7C4.5 18.9 4.8 19 5 18.9L7.2 18C7.7 18.4 8.2 18.7 8.8 18.9L9.1 21.3C9.1 21.5 9.3 21.7 9.6 21.7H14.4C14.7 21.7 14.9 21.5 14.9 21.3L15.2 18.9C15.8 18.7 16.3 18.4 16.8 18L19 18.9C19.2 19 19.5 18.9 19.6 18.7L21.4 15.6C21.5 15.4 21.5 15.1 21.3 15L19.4 13.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

export const PanelIcon = ({
  color = "currentColor",
  size = 20,
  strokeWidth = 1.6,
  ...props
}) => (
  <svg
    {...base(size)}
    {...props}
  >
    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke={color} strokeWidth={strokeWidth} />
    <path d="M9.5 5V19" stroke={color} strokeWidth={strokeWidth} />
    <path d="M9.5 12H21" stroke={color} strokeWidth={strokeWidth} />
  </svg>
);


