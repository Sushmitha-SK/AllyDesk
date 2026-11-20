export const authAppearance = {
    elements: {
        rootBox: "w-full",
        cardBox: "w-full border-0 bg-transparent shadow-none",
        card: "w-full gap-7 border-0 bg-transparent p-0 shadow-none",

        // Header: left aligned, matches the landing page headline weight
        header: "items-start gap-1.5 text-left",
        headerTitle:
            "w-full text-left text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground",
        headerSubtitle: "w-full text-left text-sm text-muted-foreground",

        // Social buttons
        socialButtonsBlockButton:
            "h-11 rounded-xl border border-border bg-card text-card-foreground shadow-xs transition-colors hover:bg-muted",
        socialButtonsBlockButtonText: "font-medium text-foreground",
        socialButtonsProviderIcon: "size-4",

        // "or" divider
        dividerLine: "bg-border",
        dividerText: "text-xs uppercase tracking-wider text-muted-foreground",

        // Fields
        formFieldLabel: "text-sm font-medium text-foreground",
        formFieldInput:
            "h-11 rounded-xl border border-input bg-background text-foreground shadow-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/30",
        formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
        formFieldAction: "text-sm font-medium text-primary hover:text-primary/80",
        formFieldHintText: "text-muted-foreground",
        formFieldErrorText: "text-destructive",
        formFieldSuccessText: "text-status-resolved",
        otpCodeFieldInput: "rounded-lg border border-input bg-background text-foreground",

        // Primary action: same pill as the "Get Started" button on the landing page
        formButtonPrimary:
            "h-11 rounded-full bg-primary text-sm font-medium normal-case text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:ring-ring/40",

        // Secondary bits
        identityPreview: "rounded-xl border border-border bg-card",
        identityPreviewText: "text-foreground",
        identityPreviewEditButton: "text-primary hover:text-primary/80",
        alert: "rounded-xl border border-border bg-card text-card-foreground",
        alertText: "text-foreground",
        formResendCodeLink: "font-medium text-primary hover:text-primary/80",
        backLink: "font-medium text-primary hover:text-primary/80",

        // Footer ("Don't have an account?")
        footer: "bg-none bg-transparent",
        footerAction: "justify-start bg-transparent p-0",
        footerActionText: "text-sm text-muted-foreground",
        footerActionLink: "text-sm font-medium text-primary hover:text-primary/80 hover:underline",
    },
};
