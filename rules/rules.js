{
  "rules": {
    "areas": {
        ".read": "auth != null",
        ".write": "root.child('settings').child('isAdmin').child('auth.uid').exists()"
    },
    "categories": {
        ".read": "auth != null",
        ".write": "root.child('settings').child('isAdmin').child('auth.uid').exists()"
    },
    "pages": {
        ".read": "auth != null",
        ".write": "root.child('settings').child('isAdmin').child('auth.uid').exists()"
    },
    "providers": {
        ".read": "auth != null",
        ".write": "auth != null"
    },
    "settings": {
        ".read": "root.child('settings').child('isAdmin').child('auth.uid').exists()",
        ".write": "root.child('settings').child('isAdmin').child('auth.uid').exists()"
    },
    "transactions": {
        ".read": "auth != null",
        ".write": "auth != null"
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('settings').child('isAdmin').child('auth.uid').exists()",
        ".write": "$uid === auth.uid || root.child('settings').child('isAdmin').child('auth.uid').exists()"
      }
    }
  }
}