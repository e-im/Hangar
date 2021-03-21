import { LocaleMessageObject } from 'vue-i18n';

const msgs: LocaleMessageObject = {
    general: {
        close: 'Close',
        submit: 'Submit',
        save: 'Save',
        comment: 'Comment',
        change: 'Change',
        donate: 'Donate',
        continue: 'Continue',
        create: 'Create',
        delete: 'Delete',
        or: 'Or',
        reset: 'Reset',
        edit: 'Edit',
        required: 'Required',
        add: 'Add',
        name: 'Name',
        link: 'Link',
        send: 'Send',
        message: 'Message',
        refresh: 'Refresh',
        error: {
            invalidUrl: 'Invalid URL format',
        },
    },
    hangar: {
        projectSearch: {
            query: 'Search in {0} projects, proudly made by the community...',
            relevanceSort: 'Sort with relevance',
            noProjects: 'There are no projects. 😢',
            noProjectsFound: 'Found 0 projects. 😢',
        },
        subtitle: 'A Minecraft package repository',
        sponsoredBy: 'Sponsored by',
    },
    pages: {
        authors: 'Authors',
        staff: 'Staff',
    },
    nav: {
        login: 'Login',
        signup: 'Signup',
        user: {
            notifications: 'Notifications',
            flags: 'Flags',
            projectApprovals: 'Project approvals',
            versionApprovals: 'Version approvals',
            stats: 'Stats',
            health: 'Hangar Health',
            log: 'User Action Log',
            platformVersions: 'Platform Versions',
            logout: 'Sign out',
        },
        createNew: 'Create new...',
        new: {
            project: 'New Project',
            organization: 'New Organization',
        },
        hangar: {
            home: 'Homepage',
            forums: 'Forums',
            code: 'Code',
            docs: 'Docs',
            javadocs: 'JavaDocs',
            hangar: 'Hangar (Plugins)',
            downloads: 'Downloads',
            community: 'Community',
        },
    },
    project: {
        stargazers: 'Stargazers',
        noStargazers: 'There are no stargazers on this project yet 😢',
        watchers: 'Watchers',
        noWatchers: 'There are no watchers on this project yet 😢',
        members: 'Members',
        category: {
            info: 'Category: {0}',
            admin_tools: 'Admin Tools',
            chat: 'Chat',
            dev_tools: 'Developer Tools',
            economy: 'Economy',
            gameplay: 'Gameplay',
            games: 'Games',
            protection: 'Protection',
            role_playing: 'Role Playing',
            world_management: 'World Management',
            misc: 'Miscellaneous',
        },
        actions: {
            unwatch: 'Unwatch',
            watch: 'Watch',
            flag: 'Flag',
            star: 'Star',
            unstar: 'Unstar',
            adminActions: 'Admin Actions',
            flagHistory: 'Flag history ({0})',
            staffNotes: 'Staff notes ({0})',
            userActionLogs: 'User Action Logs',
            forum: 'Forum',
        },
        flag: {
            flagProject: 'Flag {0}?',
        },
        tabs: {
            docs: 'Docs',
            versions: 'Versions',
            discuss: 'Discuss',
            settings: 'Settings',
            homepage: 'Homepage',
            issues: 'Issues',
            source: 'Source',
            support: 'Support',
        },
        new: {
            step1: {
                title: 'User Agreement',
                text:
                    'A project contains your downloads and the documentation for your plugin.<br>Before continuing, please review the <a href="#">Hangar Submission Guidelines.</a>',
                continue: 'Agree',
                back: 'Abort',
            },
            step2: {
                title: 'Basic Settings',
                continue: 'Continue',
                back: 'Back',
                userselect: 'Create as...',
                projectname: 'Project name',
                projectsummary: 'Project Summary',
                projectcategory: 'Project Category',
            },
            step3: {
                title: 'Additional Settings',
                continue: 'Continue',
                back: 'Back',
                optional: 'Optional',
                links: 'Links',
                homepage: 'Homepage',
                issues: 'Issue Tracker',
                source: 'Source Code',
                support: 'External Support',
                licence: 'Licence',
                type: 'Type',
                customName: 'Name',
                url: 'URL',
                seo: 'SEO',
                keywords: 'Keywords',
            },
            step4: {
                title: 'Import from Spigot',
                continue: 'Continue',
                back: 'Back',
                optional: 'Optional',
                convert: 'Convert',
                preview: 'Preview',
                tutorial: 'How to get the BBCode',
            },
            step5: {
                title: 'Finishing',
                text: 'Creating...',
            },
            error: {
                create: 'There was an error creating the project',
                nameExists: 'A project with this name already exists',
                slugExists: 'A project with this slug already exists',
                invalidName: 'This name contains invalid characters',
                tooLongName: 'Project name is too long',
                tooLongDesc: 'Project description is too long',
                tooManyKeywords: 'Project has too many keywords',
                noCategory: 'Project must have a category',
                noDescription: 'Project must have a description',
            },
        },
        sendForApproval: 'Send for approval',
        info: {
            title: 'Information',
            publishDate: 'Published on {0}',
            views: '0 views | {0} view | {0} views',
            totalDownloads: '0 total downloads | {0} total download | {0} total downloads',
            stars: '0 stars | {0} star | {0} stars',
            watchers: '0 watchers | {0} watcher | {0} watchers',
        },
        promotedVersions: 'Promoted Versions',
        license: {
            link: 'Licensed under ',
        },
        error: {
            star: 'Could not toggle starred',
            watch: 'Could not toggle watched',
        },
        settings: {
            title: 'Settings',
            category: 'Category',
            categorySub: 'Categorize your project into one of 10 categories. Appropriately categorizing your project makes it easier for people to find.',
            keywords: 'Keywords',
            keywordsSub: 'These are special words that will return your project when people add them to their searches. Max 5.',
            homepage: 'Homepage',
            homepageSub:
                'Having a custom homepage for your project helps you look more proper, official, and gives you another place to gather information about your project.',
            issues: 'Issue tracker',
            issuesSub: 'Providing an issue tracker helps your users get support more easily and provides you with an easy way to track bugs.',
            source: 'Source code',
            sourceSub: 'Support the community of developers by making your project open source!',
            support: 'External support',
            supportSub: 'An external place where you can offer support to your users. Could be a forum, a Discord server, or somewhere else.',
            license: 'License',
            licenceSub: 'What can people do (and not do) with your project?',
            forum: 'Create posts on the forums',
            forumSub: 'Sets if events like a new release should automatically create a post on the forums',
            description: 'Description',
            descriptionSub: 'A short description of your project',
            icon: 'Icon',
            iconSub: 'Upload an image representative of your project.',
            iconUpload: 'Upload',
            iconReset: 'Reset Icon',
            apiKey: 'API Keys',
            apiKeySub: 'Generate a unique deployment key to enable build deployment from Gradle',
            apiKeyGenerate: 'Generate',
            rename: 'Rename',
            renameSub: 'Changing your projects name can have undesired consequences. We will not setup any redirects.',
            delete: 'Delete',
            deleteSub: 'Once you delete a project, it cannot be recovered.',
            hardDelete: 'Hard Delete',
            hardDeleteSub: 'Once you delete a project, it cannot be recovered.',
            save: 'Save changes',
            optional: '(optional)',
            licenceCustom: 'Custom Name',
            licenceType: 'Type',
            licenceUrl: 'URL',
            error: {
                invalidFile: '{0} is an invalid file type',
                noFile: 'No file submitted',
                members: {
                    invalidUser: '{0} is not a valid user',
                    alreadyMember: '{0} is already a member, cannot add them',
                    notMember: '{0} is not a member, therefore you cannot edit their role',
                    isOwner: 'Cannot change the role of the project owner',
                },
            },
            success: {
                changedIcon: 'Successfully changed the project icon',
                resetIcon: 'Successfully reset the project icon',
                rename: 'Successfully renamed the project to {0}',
            },
        },
    },
    page: {
        plural: 'Pages',
        new: {
            title: 'Create a new page',
            error: {
                minLength: 'Page contents are too short',
                maxLength: 'Page contents are too long',
                duplicateName: 'A page with that name already exists',
                name: {
                    maxLength: 'Page name too long',
                    minLength: 'Page name too short',
                    invalidChars: 'Page name contained invalid characters',
                },
                save: 'Unable to save page',
            },
            name: 'Page Name',
            parent: 'Parent Page (optional)',
        },
        delete: {
            title: 'Delete page?',
            text: 'Are you sure you want to delete this page? This cannot be undone.',
        },
    },
    version: {
        new: {
            title: 'Create version...',
            upload: 'Upload File',
            uploadNew: 'Upload a new Version',
            url: 'Enter a URL',
            form: {
                versionString: 'Version',
                fileName: 'File name',
                fileSize: 'File size',
                externalUrl: 'External URL',
                hangarProject: 'Hangar Project',
                channel: 'Channel',
                addChannel: 'Add Channel',
                unstable: 'Unstable',
                recommended: 'Recommended',
                forumPost: 'Forum Post',
                release: {
                    bulletin: 'Release Bulletin',
                    desc: "What's new in this release?",
                },
                platforms: 'Platforms',
                dependencies: 'Plugin Dependencies',
            },
            error: {
                metaNotFound: 'Could not load metadata from uploaded file',
                jarNotFound: 'Could not open jar file',
                fileExtension: 'Incorrect file extension',
                unexpected: 'An unexpected error occurred',
                invalidVersionString: 'Invalid version string found',
                duplicateNameAndPlatform: 'A version with this name and compatible platform already exists',
                invalidNumOfPlatforms: 'Invalid number of platforms',
                duplicate: 'A version with this file already exists',
                noFile: 'Could not find uploaded file',
                mismatchedFileSize: 'File sizes do not match',
                hashMismatch: 'File hashes do not match',
                invalidPlatformVersion: 'Invalid MC version for a platform specified',
                fileIOError: 'File IO Error',
                unknown: 'An unknown error has occurred',
                incomplete: 'Plugin file missing {0}',
                noDescription: 'Must have a description',
                invalidPluginDependencyNamespace: 'Declared plugin dependency has an invalid project namespace',
                channel: {
                    noName: 'Must have a channel name specified',
                    noColor: 'Must have a channel color specified',
                },
            },
        },
        edit: {
            platformVersions: 'Edit Platform Versions: {0}',
            pluginDeps: 'Edit Plugin Dependencies: {0}',
            error: {
                noPlatformVersions: 'Must supply at least one valid platform version',
                invalidVersionForPlatform: '{0} is an invalid version for {1}',
                invalidProjectNamespace: '{0} is not a valid project namespace',
            },
        },
        page: {
            subheader: '{0} released this version on {1}',
            dependencies: 'Dependencies',
            platform: 'Platform',
            required: '(required)',
            adminMsg: '{0} approved this version on {1}',
            reviewLogs: 'Review logs',
            reviewStart: 'Start review',
            delete: 'Delete',
            download: 'Download',
            downloadExternal: 'Download External',
            adminActions: 'Admin actions',
            recommended: 'Recommended version',
            partiallyApproved: 'Partially approved',
            approved: 'Approved',
            userAdminLogs: 'User Admin Logs',
        },
        channels: 'Channels',
        editChannels: 'Edit Channels',
        platforms: 'Platforms',
    },
    channel: {
        modal: {
            titleNew: 'Add a new channel',
            titleEdit: 'Edit channel',
            name: 'Channel Name',
            color: 'Channel Color',
            reviewQueue: 'Exclude from moderation review queue?',
            error: {
                invalidName: 'Invalid channel name',
                maxChannels: 'This project already has the maximum number of channels: {0}',
                duplicateColor: 'This project already has a channel with this color',
                duplicateName: 'This project already has a channel with this name',
                tooLongName: 'Channel name is too long',
                cannotDelete: 'You cannot delete this channel',
            },
        },
        manage: {
            title: 'Release channels',
            subtitle: 'Release channels represent the state of a plugin release. A project may have up to five release channels.',
            channelName: 'Channel Name',
            versionCount: 'Version Count',
            reviewed: 'Reviewed',
            edit: 'Edit',
            trash: 'Trash',
            editButton: 'Edit',
            deleteButton: 'Delete',
            add: 'Add Channel',
        },
    },
    organization: {
        new: {
            title: 'Create a new Organization',
            text: 'Organizations allow you group users provide closer collaboration between them within your projects on Hangar.',
            name: 'Organization Name',
        },
    },
    form: {
        memberList: {
            addUser: 'Add User...',
            create: 'Create',
            editUser: 'Edit User',
            invitedAs: '(Invited as {0})',
        },
    },
    notifications: {
        title: 'Notifications',
        invites: 'Invites',
        invited: 'You have been invited to join {0}',
        readAll: 'Mark all as read',
        unread: 'Unread',
        read: 'Read',
        all: 'All',
        invite: {
            all: 'All',
            projects: 'Projects',
            organizations: 'Organizations',
        },
        empty: {
            unread: 'You have no unread notifications.',
            read: 'You have no read notifications.',
            all: 'You have no notifications.',
            invites: 'You have no invites',
        },
        project: {
            reviewed: '{0} {1} has been reviewed and is approved',
            reviewedPartial: '{0} {1} has been reviewed and is partially approved',
            invite: 'You have been invited to join the group {0} on the project {1}',
        },
    },
    visibility: {
        notice: {
            new:
                'This project is new, and will not be shown to others until a version has been uploaded. If a version is not uploaded over a longer time the project will be deleted.',
            needsChanges: 'This project requires changes: {0}',
            needsApproval: 'You have sent the project for review',
            softDelete: 'Project deleted by {0}',
        },
        name: {
            new: 'New',
        },
        changes: {
            version: {
                reviewed: 'due to approved reviews',
            },
        },
    },
    author: {
        watching: 'Watching',
        stars: 'Stars',
        orgs: 'Organizations',
        viewOnForums: 'View on forums ',
        taglineLabel: 'User Tagline',
        editTagline: 'Edit Tagline',
        memberSince: 'A member since {0}',
        numProjects: 'No projects | {0} project | {0} projects',
        addTagline: 'Add a tagline',
        noOrgs: '{0} is not part of any organizations. 😢',
        noWatching: '{0} has not starred any projects. 😢',
        noStarred: '{0} is not watching any projects. 😢',
        tooltips: {
            settings: 'User Settings',
            lock: 'Lock Account',
            unlock: 'Unlock Account',
            apiKeys: 'API Keys',
            activity: 'User Activity',
            admin: 'User Admin',
        },
        error: {
            invalidTagline: 'Invalid tagline',
        },
    },
    linkout: {
        title: 'External Link Warning',
        text: 'You have clicked on an external link to "{0}". If you did not intend to visit this link, please go back. Otherwise, click continue.',
        abort: 'Go Back',
        continue: 'Continue',
    },
    flags: {
        header: 'Flags for',
        noFlags: 'No flags found',
        resolved: 'Yes, by {0} on {1}',
        notResolved: 'No',
    },
    notes: {
        header: 'Notes for',
        noNotes: 'No notes found',
        addNote: 'Add notes',
        notes: 'Notes',
        placeholder: 'Add a note...',
    },
    stats: {
        title: 'Stats',
        plugins: 'Plugins',
        reviews: 'Reviews',
        uploads: 'Uploads',
        downloads: 'Downloads',
        totalDownloads: 'Total Downloads',
        unsafeDownloads: 'Unsafe Downloads',
        flags: 'Flags',
        openedFlags: 'Opened Flags',
        closedFlags: 'Closed Flags',
    },
    health: {
        title: 'Hangar Health Report',
        noTopicProject: 'Missing discussion topic',
        erroredJobs: 'Failed jobs',
        jobText: 'Job type: {0}, Error Type: {1}, Happened: {2}',
        staleProject: 'Stale projects',
        notPublicProjects: 'Hidden projects',
        noPlatform: 'No platform detected',
        missingFileProjects: 'Missing File',
        empty: 'Empty! All good!',
    },
    reviews: {
        headline: '{0} released this version on {1}',
        title: 'Review logs',
        removeFromQueue: 'Remove from queue',
        projectPage: 'Project Page',
        downloadFile: 'Download File',
        startReview: 'Start Review',
        stopReview: 'Stop Review',
        approve: 'Approve',
        approvePartial: 'Approve Partial',
        notUnderReview: 'This version is not under review',
        reviewMessage: 'Review Message',
        addMessage: 'Add Message',
        reopenReview: 'Reopen Review',
        undoApproval: 'Undo Approval',
        hideClosed: 'Hide all finished reviews',
        error: {
            noReviewStarted: 'There is no unfinished review to add a message to',
            notCorrectUser: 'You are not the user that started this review',
            cannotReopen: 'Unable to reopen this review',
            onlyOneReview: 'Cannot have more than 1 review for a version',
            badUndo: 'Can only undo approval after an approval',
        },
        presets: {
            message: '{msg}',
            start: '{name} started a review',
            stop: '{name} stopped a review: {msg}',
            reopen: '{name} reopened a review',
            approve: '{name} approved this version',
            approvePartial: '{name} partially approved this version',
            undoApproval: '{name} has undone their approval',
            reviewTitle: "{name}'s Review",
        },
        state: {
            ongoing: 'Ongoing',
            stopped: 'Stopped',
            approved: 'Approved',
            partiallyApproved: 'Partially Approved',
            lastUpdate: 'Last Update: {0}',
        },
    },
    apiKeys: {
        createNew: 'Create new key',
        existing: 'Existing keys',
        name: 'Name',
        key: 'Key',
        keyIdentifier: 'Key Identifier',
        permissions: 'Permissions',
        delete: 'Delete',
        deleteKey: 'Delete Key',
        createKey: 'Create key',
        noKeys: 'There are no api keys yet. You can create one on the right side',
    },
    platformVersions: {
        title: 'Configure Platform Versions',
        platform: 'Platform',
        versions: 'Versions',
        addVersion: 'Add Version',
        saveChanges: 'Save Changes',
    },
    flagReview: {
        title: 'Flags',
        noFlags: 'There are no flags to review.',
        msgUser: 'Message user',
        msgProjectOwner: 'Message owner',
        markResolved: 'Mark resolved',
        visibilityActions: 'Visibility actions',
    },
    validation: {
        required: '{0} is required',
        maxLength: 'Maximum length is {0}',
        minLength: 'Minimum length is {0}',
        invalidFormat: '{0} is invalid',
    },
};

export default msgs;
