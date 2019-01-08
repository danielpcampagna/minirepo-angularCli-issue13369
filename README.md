# Minimal Anular/Cli Issue 13369

This is a minimal repo to reproduce error reported in [issue #13369](https://github.com/angular/angular-cli/issues/13369).
You can either clone or follow the next steps to get the same repo.

## Steps to reproduce

1. Create a minimal project (use flag `--minimal`).

```cmd
> ng new minirepo-angularCli-issue13369 --minimal --yarn
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? CSS

> ng version
Angular CLI: 7.1.4
Node: 11.3.0
OS: win32 x64
Angular: 7.1.4
... animations, cli, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.11.4
@angular-devkit/build-angular     0.11.4
@angular-devkit/build-optimizer   0.11.4
@angular-devkit/build-webpack     0.11.4
@angular-devkit/core              7.1.4
@angular-devkit/schematics        7.1.4
@ngtools/webpack                  7.1.4
@schematics/angular               7.1.4
@schematics/update                0.11.4
rxjs                              6.3.3
typescript                        3.1.6
webpack                           4.23.1

```

2. Create a component and its module.

```cmd
> cd  minirepo-angularCli-issue13369/
> ng g module dashboard-page
> ng generate component dashboard-page --module dashboard-page
```

3. Append a lazy loading router to this new component.

  a. Adding a router in component's module (i.e. `dashboard.module.ts`).

```typescript
export const routes = [
  { path: '', component: DashboardPageComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DashboardPageModule { }
```

  b. Adding a lazy loading router (i.e. using `loadChildren`) to `dashboard-page.module` in `app-routing.modules.ts`.

```typescript
const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard-page/dashboard-page.module#DashboardPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
```

  c. And, finally, adding router link to access our new path `dashboard`.

```typescript
<li>
    <h2><a [routerLink]="['/dashboard']" routerLinkActive="active-link" >Dashboard</a></h2>
</li>
```


However, following this steps, we didn't get expected error.