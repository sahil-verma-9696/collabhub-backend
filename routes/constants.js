export const ROUTES = {
  AUTH: {
    BASE: "/api/auth",
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH: "/refresh-token",
  },

  USER: {
    BASE: "/api/user",
    PROFILE: "/profile", // Get user profile
    UPDATE: "/update-profile", // Update user profile
    SEARCH: "/search", // Search users by name/skills
    CONNECTIONS: "/connections", // List user's connections (friends/colleagues)
    FOLLOW: "/:id/follow", // Follow/unfollow users (optional)
    PREFERENCES: "/preferences", // Update user preferences
    DELETE: "/delete-account", // Delete user account
  },

  TEAM: {
    BASE: "/api/team",
    CREATE: "/create",
    LIST: "/list",
    DETAILS: "/:id",
    UPDATE: "/:id/update",
    DELETE: "/:id/delete",
    INVITE: "/:id/invite",
    JOIN: "/:id/join",
    LEAVE: "/:id/leave",
    ROLES: "/:id/roles", // Get team roles
    UPDATE_ROLE: "/:id/role/update", // Update user role in team
    REMOVE_MEMBER: "/:id/member/remove", // Remove a member from the team
  },

  HACKATHON: {
    BASE: "/api/hackathon",
    CREATE: "/create",
    LIST: "/list",
    DETAILS: "/:id",
    UPDATE: "/:id/update",
    DELETE: "/:id/delete",
    JOIN: "/:id/join", // Join a hackathon
    LEAVE: "/:id/leave", // Leave a hackathon
    SUBMIT_PROJECT: "/:id/submit-project", // Submit final project for evaluation
  },

  PROJECT: {
    BASE: "/api/project",
    CREATE: "/create",
    LIST: "/list",
    DETAILS: "/:id",
    UPDATE: "/:id/update",
    DELETE: "/:id/delete",
  },

  TASK: {
    BASE: "/api/task",
    CREATE: "/create",
    LIST: "/list",
    DETAILS: "/:id",
    UPDATE: "/:id/update",
    DELETE: "/:id/delete",
    ASSIGN: "/:id/assign", // Assign task to a user
    STATUS: "/:id/status", // Update task status
    COMMENTS: "/:id/comments", // Add/view comments on a task
    ATTACHMENT: "/:id/attachment", // Upload/download task-related files
  },

  COLLAB: {
    BASE: "/api/collab",
    CHAT: "/chat", // Chat messages API
    VIDEO_CALL: "/video-call", // Start a video call session
    WHITEBOARD: "/whiteboard", // Real-time whiteboard collaboration
    DRAW: "/whiteboard/draw", // Sync drawing events
    ERASE: "/whiteboard/erase", // Erase specific elements
    SAVE: "/whiteboard/save", // Save whiteboard state
  },

  PRESENTATION: {
    BASE: "/api/presentation",
    GENERATE: "/generate", // Generate a presentation
    LIST: "/list", // List all presentations
    DETAILS: "/:id", // Get presentation details
    DELETE: "/:id/delete", // Delete a presentation
  },

  NOTIFY: {
    BASE: "/api/notify",
    LIST: "/list", // List all notifications
    READ: "/:id/read", // Mark as read
    DELETE: "/:id/delete", // Delete a notification
  },
};
