import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: '',
  redirectTo: 'opening',
  pathMatch: 'full'
},
{
  path: 'opening',
  loadComponent: () =>
    import('./opening/opening.page').then(m => m.OpeningPage)
},

  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.page').then(m => m.AboutPage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'add-habit',
    loadComponent: () =>
      import('./add-habit/add-habit.page').then(m => m.AddHabitPage)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then( m => m.ContactPage)
  },
{
  path: 'dashboard',
  loadComponent: () =>
    import('./dashboard/dashboard.page').then(m => m.DashboardPage)
},
  {
    path: 'streaks',
    loadComponent: () => import('./streaks/streaks.page').then( m => m.StreaksPage)
  },
  {
    path: 'rewards',
    loadComponent: () => import('./rewards/rewards.page').then( m => m.RewardsPage)
  },
  {
    path: 'completion',
    loadComponent: () => import('./completion/completion.page').then( m => m.CompletionPage)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./analytics/analytics.page').then( m => m.AnalyticsPage)
  },
  {
    path: 'gamification',
    loadComponent: () => import('./gamification/gamification.page').then( m => m.GamificationPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  {
  path: 'profile',
  loadComponent: () =>import('./profile/profile.page').then(m => m.ProfilePage)
},
  {
  path: 'community',
  loadComponent: () =>
    import('./community/community.page').then(m => m.CommunityPage)
},
{
  path: 'community/leaderboard',
  loadComponent: () =>
    import('./community/leaderboard/leaderboard.page')
      .then(m => m.LeaderboardPage)
},
{
  path: 'community/badges',
  loadComponent: () =>
    import('./community/badges/badges.page')
      .then(m => m.BadgesPage)
},
{
  path: 'community/global-ranking',
  loadComponent: () =>
    import('./community/global-ranking/global-ranking.page')
      .then(m => m.GlobalRankingPage)
},
{
  path: 'community/comments',
  loadComponent: () =>
    import('./community/comments/comments.page')
      .then(m => m.CommentsPage)
},
{
  path: 'community/public-profile',
  loadComponent: () =>
    import('./community/public-profile/public-profile.page')
      .then(m => m.PublicProfilePage)
},
{
  path: 'community/ai-suggestions',
  loadComponent: () =>
    import('./community/ai-suggestions/ai-suggestions.page')
      .then(m => m.AiSuggestionsPage)
},
{
  path: 'community/friends',
  loadComponent: () =>
    import('./community/friends/friends.page')
      .then(m => m.FriendsPage)
}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
