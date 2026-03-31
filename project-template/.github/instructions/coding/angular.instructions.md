---
description: Angular framework best practices, patterns, and conventions
applyTo: "frontend/**/*.ts"
---

# Angular Development Instructions

## Overview

This document provides systematic instructions for Angular framework development best practices and patterns using the AI-first delivery methodology. These instructions follow established Angular conventions and transform modern frontend application requirements into comprehensive development standards that leverage Angular's capabilities, maintain component architecture, and ensure scalable TypeScript-based development.

## Process Overview

**Angular Development Implementation** transforms frontend application requirements into structured Angular implementations that deliver scalable single-page applications, effective component communication, comprehensive testing strategies, and maintainable user interfaces through proper module organization, Angular patterns, and established conventions for enterprise Angular applications.

## Implementation Process & Framework Guidelines

This document establishes coding standards and best practices for Angular development. All frontend team members must follow these guidelines to maintain consistency, quality, and maintainability across Angular projects.

---

## 1. Project Setup & Angular CLI

### Initial Setup
```bash
# Create new Angular project (standalone components recommended for Angular 17+)
ng new <project-name> --standalone --routing --package-manager=npm

# Install dependencies
npm install

# Start development server on http://localhost:4200
ng serve

# Build for production
ng build --prod

# Run tests
ng test

# Run linting
ng lint
```

### Version Requirements
- **Angular**: 17.x or higher
- **Node.js**: 18.x or higher
- **TypeScript**: 5.2.x or higher
- **npm**: 9.x or higher

### Project Configuration
Keep `angular.json` optimized:
- Set `budgets` for bundle size limits (alert at 500KB, error at 800KB)
- Enable `production` optimizations: AOT, minification, dead code elimination
- Configure CSS/SCSS preprocessor settings

---

## 2. Component Architecture & Best Practices

### 2.1 Component Declaration
Use **standalone components** (Angular 17+):
```typescript
// ✅ GOOD: Standalone component
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, InvoiceStatusBadgeComponent, PaginationComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceListComponent {
  @Input() invoices: Invoice[] = [];
  @Output() invoiceSelected = new EventEmitter<Invoice>();

  onInvoiceClick(invoice: Invoice): void {
    this.invoiceSelected.emit(invoice);
  }
}
```

### 2.2 Component Naming & File Structure
```
src/app/
├── pages/                          # Page-level components (routed)
│   ├── [feature-name]/
│   │   ├── [feature-name].component.ts
│   │   ├── [feature-name].component.html
│   │   ├── [feature-name].component.css
│   │   └── [feature-name].component.spec.ts
├── shared/                         # Reusable across pages
│   ├── components/                 # Presentational components
│   │   ├── invoice-status-badge/
│   │   ├── pagination/
│   │   └── loading-spinner/
│   ├── services/                   # Business logic services
│   │   ├── invoice.service.ts
│   │   ├── merchant.service.ts
│   │   └── api.service.ts
│   ├── models/                     # TypeScript interfaces
│   │   ├── invoice.model.ts
│   │   ├── merchant.model.ts
│   │   └── index.ts
│   ├── pipes/                      # Custom pipes
│   │   └── currency.pipe.ts
│   ├── directives/                 # Custom directives
│   │   └── highlight.directive.ts
│   └── guards/                     # Route guards
│       └── auth.guard.ts
├── layout/                         # Layout shell
│   ├── layout.component.ts
│   ├── header.component.ts
│   ├── navigation.component.ts
│   └── ...
└── app.routes.ts                   # Routing configuration
```

**Naming Conventions**:
- Components: `dashboard.component.ts` (kebab-case)
- Services: `invoice.service.ts`
- Interfaces: `invoice.model.ts` (use `.model.ts` for DTOs)
- Specs: `dashboard.component.spec.ts`

### 2.3 Component Lifecycle & OnInit
```typescript
import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  @Input() invoiceId?: string;
  
  invoice$ = new Subject<Invoice>();
  private destroy$ = new Subject<void>();

  constructor(
    private invoiceService: InvoiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Load data on component init
    if (this.invoiceId) {
      this.invoiceService
        .getInvoiceById(this.invoiceId)
        .pipe(
          takeUntil(this.destroy$)  // Auto-unsubscribe on destroy
        )
        .subscribe(invoice => {
          this.invoice$.next(invoice);
          this.cdr.markForCheck();  // Trigger change detection if OnPush
        });
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 2.4 Component Input/Output & Communication
```typescript
// Parent → Child: @Input
@Component({
  selector: 'app-parent',
  template: `<app-child [invoice]="selectedInvoice" (invoiceDeleted)="onDelete($event)"></app-child>`
})
export class ParentComponent {
  selectedInvoice: Invoice | null = null;
  
  onDelete(invoice: Invoice): void {
    console.log('Invoice deleted:', invoice);
  }
}

// Child component
@Component({
  selector: 'app-child',
  standalone: true,
  template: `<button (click)="deleteInvoice()">Delete</button>`
})
export class ChildComponent {
  @Input() invoice: Invoice | null = null;
  @Output() invoiceDeleted = new EventEmitter<Invoice>();

  deleteInvoice(): void {
    if (this.invoice) {
      this.invoiceDeleted.emit(this.invoice);
    }
  }
}
```

**Rules**:
- Small, focused components (single responsibility)
- Use `@Input` for parent → child data
- Use `@Output` with `EventEmitter` for child → parent communication (avoid two-way binding)
- Keep component logic simple; move business logic to services

### 2.5 Change Detection Strategy
Always use **OnPush** for better performance:
```typescript
@Component({
  selector: 'app-invoice-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
  // ...
})
export class InvoiceListComponent {
  // Component only checks for changes when:
  // 1. @Input properties change
  // 2. @Output events emit
  // 3. Async pipe receives new value
  // 4. Manual CD via ChangeDetectorRef
}
```

---

## 3. Services & Dependency Injection

### 3.1 Service Creation
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  // Available app-wide via DI
})
export class InvoiceService {
  private apiUrl = '/api/invoices';
  private invoicesCache$ = new BehaviorSubject<Invoice[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Fetch all invoices with optional filtering
   * @param filters - Optional filter criteria (status, date range)
   * @returns Observable of invoice list
   */
  getInvoices(filters?: InvoiceFilters): Observable<Invoice[]> {
    let params = new HttpParams();
    
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    if (filters?.dateFrom) {
      params = params.set('dateFrom', filters.dateFrom.toISOString());
    }

    return this.http.get<Invoice[]>(this.apiUrl, { params }).pipe(
      // Cache results - same request within 5 min uses cache
      shareReplay({ bufferSize: 1, refCount: true }),
      // Transform response if needed
      map(invoices => invoices.map(inv => this.enrichInvoice(inv))),
      // Handle errors gracefully
      catchError(error => {
        console.error('Failed to fetch invoices:', error);
        throw new Error(`Invoice service error: ${error.message}`);
      })
    );
  }

  /**
   * Fetch single invoice by ID
   */
  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        throw new Error(`Failed to fetch invoice ${id}: ${error.message}`);
      })
    );
  }

  /**
   * Update invoice status
   */
  updateInvoiceStatus(id: string, status: InvoiceStatus): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/${id}`, { status }).pipe(
      tap(() => this.invalidateCache()),
      catchError(error => {
        throw new Error(`Failed to update invoice status: ${error.message}`);
      })
    );
  }

  /**
   * Download invoice as PDF
   */
  downloadInvoice(id: string): void {
    this.http.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  /**
   * Invalidate cache after mutations
   */
  private invalidateCache(): void {
    this.invoicesCache$.next([]);
  }

  /**
   * Business logic: Enrich invoice with computed properties
   */
  private enrichInvoice(invoice: Invoice): Invoice {
    return {
      ...invoice,
      daysSinceCreation: this.calculateDaysSince(invoice.date),
      isOverdue: this.checkOverdue(invoice)
    };
  }

  private calculateDaysSince(date: Date): number {
    return Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
  }

  private checkOverdue(invoice: Invoice): boolean {
    return invoice.status === 'unpaid' && new Date(invoice.dueDate) < new Date();
  }
}
```

### 3.2 HTTP Interceptor for Common Patterns
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add auth token to all requests
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(error => {
        // Handle common HTTP errors
        if (error.status === 401) {
          // Redirect to login
        } else if (error.status === 403) {
          // Show permission error
        }
        throw error;
      })
    );
  }
}

// Provide in app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([apiInterceptorFn])
    )
  ]
};
```

### 3.3 Dependency Injection Rules
```typescript
// ✅ GOOD: Inject service via constructor
@Component({...})
export class InvoicesComponent {
  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
}

// ❌ BAD: Service locator pattern (avoid)
export class OldComponent {
  constructor(private injector: Injector) {
    const service = this.injector.get(InvoiceService);  // Don't do this
  }
}
```

---

## 4. RxJS & Reactive Programming

### 4.1 Observable Patterns
```typescript
// Fetch data on component init
invoices$ = this.invoiceService.getInvoices().pipe(
  shareReplay(1),  // Cache one value for late subscribers
  catchError(error => {
    console.error('Failed to load invoices', error);
    return of([]);  // Fallback to empty array
  })
);

// Transform data
filteredInvoices$ = combineLatest([
  this.invoices$,
  this.statusFilter$
]).pipe(
  map(([invoices, status]) => 
    status ? invoices.filter(inv => inv.status === status) : invoices
  )
);

// Handle async operations
saveInvoice$ = this.form.valueChanges.pipe(
  debounceTime(300),  // Wait 300ms after user stops typing
  distinctUntilChanged(),  // Only if value actually changed
  switchMap(data => this.invoiceService.updateInvoice(data)),  // Cancel previous if new arrives
  catchError(error => {
    this.error$ = `Failed to save: ${error.message}`;
    return EMPTY;  // Complete on error
  })
);
```

### 4.2 Subject vs BehaviorSubject
```typescript
// Use BehaviorSubject for state that components need on subscribe
private selectedInvoiceSubject = new BehaviorSubject<Invoice | null>(null);
selectedInvoice$ = this.selectedInvoiceSubject.asObservable();

selectInvoice(invoice: Invoice): void {
  this.selectedInvoiceSubject.next(invoice);
}

// Use Subject for events (late subscribers won't get past events)
private deleteConfirmedSubject = new Subject<Invoice>();
deleteConfirmed$ = this.deleteConfirmedSubject.asObservable();

confirmDelete(invoice: Invoice): void {
  this.deleteConfirmedSubject.next(invoice);
}
```

### 4.3 Unsubscribe Patterns
```typescript
// ✅ BEST: Use takeUntil for auto-unsubscribe
export class InvoiceListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.invoiceService.getInvoices()
      .pipe(takeUntil(this.destroy$))
      .subscribe(invoices => this.invoices = invoices);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// ✅ GOOD: Use async pipe (auto-unsubscribe)
export class InvoiceListComponent {
  invoices$ = this.invoiceService.getInvoices();
  
  // In template:
  // <div *ngFor="let invoice of invoices$ | async">
}

// ❌ BAD: Manual unsubscribe (easy to forget)
private subscription?: Subscription;

ngOnInit(): void {
  this.subscription = this.invoiceService.getInvoices()
    .subscribe(...);
}

ngOnDestroy(): void {
  this.subscription?.unsubscribe();  // Easy to forget
}
```

---

## 5. Routing & Navigation

### 5.1 Route Configuration (Standalone Style)
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,  // Shell component
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        data: { title: 'Invoices' }
      },
      {
        path: 'invoices/:id',
        component: InvoiceDetailComponent,
        data: { title: 'Invoice Details' },
        canActivate: [InvoiceExistsGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```

### 5.2 Route Guards
```typescript
import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

// Functional guard (modern approach)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

// Class-based guard (if needed for complex logic)
@Injectable({
  providedIn: 'root'
})
export class InvoiceExistsGuard implements CanActivate {
  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    
    if (!id) return of(false);

    return this.invoiceService.getInvoiceById(id).pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/invoices']);
        return of(false);
      })
    );
  }
}
```

### 5.3 Navigation & Router
```typescript
@Component({...})
export class InvoiceListComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Navigate to invoice detail page
   */
  viewInvoice(invoiceId: string): void {
    this.router.navigate([invoiceId], { relativeTo: this.route });
  }

  /**
   * Navigate with query parameters
   */
  filterByStatus(status: InvoiceStatus): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { status },
      queryParamsHandling: 'merge'  // Merge with existing params
    });
  }

  /**
   * Read route parameters
   */
  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.currentStatus = params['status'];
      });
  }

  /**
   * Navigate back
   */
  goBack(): void {
    window.history.back();
  }
}
```

---

## 6. Forms & Validation

### 6.1 Reactive Forms (Recommended)
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="filterForm" (ngSubmit)="onFilter()">
      <div>
        <label for="status">Status</label>
        <select id="status" formControlName="status">
          <option value="">All</option>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
        @if (filterForm.get('status')?.hasError('required')) {
          <span class="error">Status is required</span>
        }
      </div>

      <div>
        <label for="dateFrom">Date From</label>
        <input 
          id="dateFrom" 
          type="date" 
          formControlName="dateFrom"
          [formGroup]="filterForm"
        />
      </div>

      <button type="submit" [disabled]="filterForm.invalid">
        Apply Filters
      </button>
    </form>
  `
})
export class InvoiceFilterComponent implements OnInit {
  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
    this.filterForm = this.fb.group({
      status: ['', Validators.required],
      dateFrom: [''],
      dateTo: ['']
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    // Pre-populate form from route params
    this.filterForm.patchValue({
      status: 'unpaid'
    });
  }

  /**
   * Custom validator: Ensure dateFrom < dateTo
   */
  private dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const from = group.get('dateFrom')?.value;
    const to = group.get('dateTo')?.value;

    if (from && to && new Date(from) > new Date(to)) {
      return { dateRangeInvalid: true };
    }

    return null;
  }

  onFilter(): void {
    if (this.filterForm.valid) {
      this.invoiceService.getInvoices(this.filterForm.value).subscribe();
    }
  }
}
```

### 6.2 Custom Validators
```typescript
/**
 * Validate email format (business rule: no temporary emails)
 */
export function businessEmailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const email = control.value;
  const tempEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  const domain = email.split('@')[1];

  if (tempEmailDomains.includes(domain)) {
    return { tempEmail: { value: control.value } };
  }

  return null;
}

// Use in form
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email, businessEmailValidator]]
});
```

### 6.3 Async Form Submission
```typescript
@Component({...})
export class InvoiceEditComponent {
  form: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
    this.form = this.fb.group({
      amount: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    this.isSubmitting = true;

    this.invoiceService.updateInvoice(this.form.value)
      .pipe(
        finalize(() => this.isSubmitting = false),  // Always reset flag
        catchError(error => {
          console.error('Submit failed:', error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        // Success
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
```

---

## 7. Performance & Change Detection

### 7.1 OnPush Change Detection (Always Use)
```typescript
@Component({
  selector: 'app-invoice-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush  // Only check on input change
})
export class InvoiceItemComponent {
  @Input() invoice!: Invoice;  // Mark as required
  
  constructor(private cdr: ChangeDetectorRef) {}

  // Manual trigger if needed
  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
```

Benefits:
- Only checks for changes when `@Input` properties change
- Avoids unnecessary change detection cycles
- Significant performance improvement in large lists

### 7.2 TrackBy in *ngFor
```typescript
// ❌ BAD: Forces full re-render of all items on data change
<div *ngFor="let invoice of invoices">
  {{ invoice.amount }}
</div>

// ✅ GOOD: Only re-render changed items
<div *ngFor="let invoice of invoices; trackBy: trackByInvoiceId">
  {{ invoice.amount }}
</div>

// In component:
trackByInvoiceId(index: number, invoice: Invoice): string {
  return invoice.id;
}
```

### 7.3 Lazy Loading
```typescript
// Lazy load feature modules to reduce initial bundle size
export const routes: Routes = [
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.routes').then(m => m.INVOICE_ROUTES)
  }
];

// invoices/invoices.routes.ts
export const INVOICE_ROUTES: Routes = [
  {
    path: '',
    component: InvoicesComponent
  },
  {
    path: ':id',
    component: InvoiceDetailComponent
  }
];
```

---

## 8. Testing Best Practices

### 8.1 Unit Testing Components
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceListComponent } from './invoice-list.component';
import { InvoiceService } from '../../shared/services/invoice.service';
import { of } from 'rxjs';

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;
  let mockInvoiceService: jasmine.SpyObj<InvoiceService>;

  beforeEach(async () => {
    // Create mock service
    mockInvoiceService = jasmine.createSpyObj('InvoiceService', ['getInvoices']);

    await TestBed.configureTestingModule({
      imports: [InvoiceListComponent],
      providers: [
        { provide: InvoiceService, useValue: mockInvoiceService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
  });

  it('should display invoices on init', fakeAsync(() => {
    // Arrange
    const mockInvoices: Invoice[] = [
      { id: '1', amount: 100, status: 'unpaid', date: new Date() }
    ];
    mockInvoiceService.getInvoices.and.returnValue(of(mockInvoices));

    // Act
    fixture.detectChanges();  // Trigger ngOnInit
    tick();  // Process async operations

    // Assert
    expect(mockInvoiceService.getInvoices).toHaveBeenCalled();
    expect(component.invoices).toEqual(mockInvoices);
  }));

  it('should emit event when invoice selected', () => {
    // Arrange
    spyOn(component.invoiceSelected, 'emit');
    const invoice: Invoice = { id: '1', amount: 100, status: 'unpaid' };

    // Act
    component.onInvoiceClick(invoice);

    // Assert
    expect(component.invoiceSelected.emit).toHaveBeenCalledWith(invoice);
  });

  it('should display error message on service failure', fakeAsync(() => {
    // Arrange
    mockInvoiceService.getInvoices.and.returnValue(
      throwError(() => new Error('API error'))
    );

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    expect(component.error).toBeTruthy();
  }));
});
```

### 8.2 Service Testing
```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvoiceService]
    });

    service = TestBed.inject(InvoiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no outstanding requests
    httpTestingController.verify();
  });

  it('should fetch invoices', () => {
    // Arrange
    const mockInvoices: Invoice[] = [
      { id: '1', amount: 100, status: 'unpaid' }
    ];

    // Act
    service.getInvoices().subscribe(invoices => {
      // Assert
      expect(invoices).toEqual(mockInvoices);
    });

    // Assert HTTP call
    const req = httpTestingController.expectOne('/api/invoices');
    expect(req.request.method).toBe('GET');
    req.flush(mockInvoices);
  });

  it('should handle HTTP errors', () => {
    // Act
    service.getInvoices().subscribe(
      () => fail('should not succeed'),
      (error: any) => {
        // Assert
        expect(error.message).toContain('Invoice service error');
      }
    );

    // Assert
    const req = httpTestingController.expectOne('/api/invoices');
    req.error(new ErrorEvent('Network error'));
  });
});
```

### 8.3 Test Coverage Goals
- **Unit tests**: 70% of test suite (basic business logic)
- **Integration tests**: 20% of test suite (component + service)
- **E2E tests**: 10% of test suite (critical user workflows)

Target: **80%+ code coverage** for `src/app/`

---

## 9. Security Best Practices

### 9.1 Input Sanitization
```typescript
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-invoice-display',
  template: `<div [innerHTML]="sanitizedHtml"></div>`
})
export class InvoiceDisplayComponent {
  sanitizedHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  displayInvoiceNotes(notes: string): void {
    // Always sanitize user-provided HTML
    this.sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, notes) || '';
  }
}
```

### 9.2 Authentication Token Management
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  /**
   * Store token securely (HttpOnly cookies are more secure, but localStorage works for demo)
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retrieve token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Clear token on logout
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Check if token is expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  }
}
```

### 9.3 CSRF Protection
```typescript
// Angular automatically handles CSRF tokens in HttpClient
// Looks for X-CSRF-TOKEN header in requests

// In backend, include CSRF token in response:
@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(private csrfTokenService: CsrfTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.csrfTokenService.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: {
          'X-CSRF-TOKEN': token
        }
      });
    }

    return next.handle(req);
  }
}
```

### 9.4 XSS Prevention
```typescript
// ✅ SAFE: Angular interpolation {{}} always escapes
<div>{{ userProvidedText }}</div>

// ⚠️ CAREFUL: Only use property binding for trusted data
<div [innerHTML]="sanitizedHtml"></div>

// ❌ DANGEROUS: Never use string concatenation
// element.innerHTML = "Hello " + userInput;  // XSS vulnerability
```

---

## 10. Accessibility (WCAG 2.1 AA)

### 10.1 Semantic HTML & ARIA
```typescript
@Component({
  selector: 'app-invoice-list',
  template: `
    <!-- Use semantic elements -->
    <main role="main">
      <h1>Invoices</h1>
      
      <!-- Use proper table structure -->
      <table role="table">
        <thead>
          <tr>
            <th scope="col">Invoice #</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let invoice of invoices">
            <td>{{ invoice.number }}</td>
            <td>{{ invoice.amount | currency }}</td>
            <td>{{ invoice.status }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Use aria-label for icon buttons -->
      <button aria-label="Download invoice" (click)="onDownload()">
        <i class="icon-download"></i>
      </button>

      <!-- Use aria-live for dynamic updates -->
      <div aria-live="polite" aria-atomic="true">
        @if (loadingMessage) {
          {{ loadingMessage }}
        }
      </div>
    </main>
  `
})
export class InvoiceListComponent {}
```

### 10.2 Keyboard Navigation
```typescript
// Enable keyboard support for custom components
@Component({
  selector: 'app-invoice-item',
  template: `
    <div 
      role="button" 
      tabindex="0"
      (click)="select()"
      (keydown.enter)="select()"
      (keydown.space)="select()"
      [attr.aria-selected]="isSelected"
    >
      {{ invoice.amount }}
    </div>
  `
})
export class InvoiceItemComponent {
  @Output() selected = new EventEmitter<void>();

  select(): void {
    this.selected.emit();
  }
}
```

### 10.3 Focus Management
```typescript
@Component({...})
export class DialogComponent implements AfterViewInit {
  @ViewChild('closeButton') closeButton?: ElementRef;
  private previousActiveElement: HTMLElement | null = null;

  ngAfterViewInit(): void {
    // Set focus to first interactive element when dialog opens
    this.closeButton?.nativeElement.focus();
  }

  closeDialog(): void {
    // Restore focus to previously focused element
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }
}
```

---

## 11. Styling & Theming

### 11.1 CSS Organization
```css
/* styles/global.css */
/* Base styles and CSS variables */

:root {
  /* Colors */
  --color-primary: #0066cc;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-text: #111827;
  --color-border: #e5e7eb;
  --color-background: #f9fafb;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Typography */
  --font-family: system-ui, -apple-system, sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.5;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

body {
  font-family: var(--font-family);
  color: var(--color-text);
  background: var(--color-background);
}

/* Component styles */
```

### 11.2 Component Styles (Scoped)
```typescript
@Component({
  selector: 'app-invoice-status-badge',
  standalone: true,
  template: `<span [ngClass]="getClasses()">{{ status }}</span>`,
  styles: [`
    span {
      display: inline-block;
      padding: var(--space-sm) var(--space-md);
      border-radius: 0.25rem;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .status-unpaid {
      background-color: #fee2e2;  /* Light red */
      color: #991b1b;  /* Dark red */
    }

    .status-paid {
      background-color: #d1fae5;  /* Light green */
      color: #065f46;  /* Dark green */
    }

    .status-partial {
      background-color: #dbeafe;  /* Light blue */
      color: #1e40af;  /* Dark blue */
    }
  `]
})
export class InvoiceStatusBadgeComponent {
  @Input() status: InvoiceStatus = 'unpaid';

  getClasses(): string[] {
    return ['status', `status-${this.status}`];
  }
}
```

### 11.3 Responsive Design
```css
/* Mobile first approach */
.invoice-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .invoice-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .invoice-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 12. Common Pitfalls & How to Avoid

### 12.1 Memory Leaks (Unsubscribed Observables)
```typescript
// ❌ MEMORY LEAK: Subscription never cleaned up
export class BadComponent implements OnInit {
  ngOnInit(): void {
    this.service.getData().subscribe(data => {
      this.data = data;
    });  // No unsubscribe!
  }
}

// ✅ FIXED: Use takeUntil
export class GoodComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 12.2 Excessive Change Detection
```typescript
// ❌ DEFAULT: Component checks on every event
@Component({
  selector: 'app-list',
  template: `<div *ngFor="let item of items">{{ item.name }}</div>`
  // No changeDetection specified = CheckAlways
})

// ✅ GOOD: OnPush only checks on input change
@Component({
  selector: 'app-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush  // <-- Add this
})
```

### 12.3 Mutating Form Values
```typescript
// ❌ BAD: Direct mutation
this.form.value.amount = 100;  // Won't trigger validation

// ✅ GOOD: Use form methods
this.form.patchValue({ amount: 100 });
this.form.setValue({ amount: 100 });
```

### 12.4 Calling Async Operations in Template
```typescript
// ❌ BAD: Calls function on every change detection cycle
<div>{{ expensiveFunction() }}</div>

// ✅ GOOD: Pre-compute in component
export class Component {
  computedValue = this.expensiveFunction();
}
```

### 12.5 Not Handling Observable Errors
```typescript
// ❌ BAD: Error stops observable, page breaks
this.service.loadData().subscribe(data => {
  this.data = data;
});

// ✅ GOOD: Handle errors gracefully
this.service.loadData()
  .pipe(
    catchError(error => {
      console.error('Failed to load:', error);
      return of(null);  // Fallback value
    })
  )
  .subscribe(data => {
    this.data = data;
  });
```

---

## 13. Code Organization & Best Practices

### 13.1 Folder Structure (by feature)
```
src/app/
├── shared/                    # Reusable across entire app
│   ├── components/
│   │   ├── invoice-status-badge/
│   │   ├── pagination/
│   │   └── loading-spinner/
│   ├── services/
│   │   ├── invoice.service.ts
│   │   ├── merchant.service.ts
│   │   ├── api.service.ts
│   │   └── auth.service.ts
│   ├── models/
│   │   ├── invoice.model.ts
│   │   ├── merchant.model.ts
│   │   └── index.ts
│   ├── pipes/
│   │   └── currency-format.pipe.ts
│   ├── directives/
│   │   └── highlight.directive.ts
│   └── guards/
│       └── auth.guard.ts
│
├── layout/                    # App shell
│   ├── layout.component.ts
│   ├── header.component.ts
│   ├── navigation.component.ts
│   ├── footer.component.ts
│   └── layout.component.css
│
├── pages/                     # Routed page components
│   ├── dashboard/
│   │   ├── dashboard.component.ts
│   │   ├── dashboard.component.html
│   │   └── dashboard.component.spec.ts
│   └── invoices/
│       ├── invoices.component.ts
│       ├── invoices.component.html
│       ├── invoices-list.component.ts
│       └── invoices.component.spec.ts
│
├── app.routes.ts              # Route configuration
├── app.component.ts           # Root component
└── app.config.ts              # App configuration
```

### 13.2 Model Definitions (Type Safety)
```typescript
// shared/models/invoice.model.ts
export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: 'EUR' | 'USD';
  date: Date;
  dueDate: Date;
  status: InvoiceStatus;
  description?: string;
  items?: InvoiceItem[];
}

export type InvoiceStatus = 'unpaid' | 'paid' | 'paid-in-part';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
}

export interface InvoiceFilters {
  status?: InvoiceStatus;
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
}

// Re-export from index for convenience
export * from './invoice.model';
```

### 13.3 API Service Pattern
```typescript
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  /**
   * Generic GET method
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Generic POST method
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Generic error handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.message || `Status: ${error.status}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
```

---

## 14. Project-Specific Conventions (Merchant Portal)

### 14.1 Styling & Design System
- **CSS Framework**: Bootstrap 5
- **Color Palette**: 
  - Primary: Blue (#0066cc)
  - Success: Green (#10b981)
  - Danger: Red (#ef4444)
  - Neutral text: Gray (#111827)
- **Status Badge Colors**:
  - Unpaid: Red background
  - Paid: Green background
  - Paid in part: Blue background
- Use CSS variables for theming consistency

### 14.2 API Integration
- Base URL: `http://localhost:3000/api`
- All API endpoints require Bearer token in Authorization header
- Error responses include `status`, `message`, `code`
- Use `InvoiceService` for invoice operations
- Use `MerchantService` for merchant account data

### 14.3 Navigation Structure
- Main navigation items: Home, Invoices, Transactions, Stores, Billing entities
- Use route parameters for detail pages (e.g., `/invoices/:id`)
- Always include breadcrumbs for accessibility
- Active menu item should be highlighted

### 14.4 Performance Targets
- Initial bundle size < 500KB
- Lighthouse score > 90
- First Contentful Paint < 2 seconds
- Interactive < 3 seconds
- Use lazy loading for feature modules

### 14.5 Test Coverage
- Target 80%+ coverage for `src/app/`
- Write tests for all services
- Write tests for page components
- Use mocks for HTTP calls
- E2E tests for critical user journeys

---

## 15. Development Workflow

### 15.1 Component Creation Checklist
- [ ] Create component using `ng generate component`
- [ ] Use standalone: true
- [ ] Implement OnInit, OnDestroy if needed
- [ ] Use ChangeDetectionStrategy.OnPush
- [ ] Add @Input/@Output for communication
- [ ] Create .spec.ts file with tests
- [ ] Document public methods with JSDoc
- [ ] Add accessibility attributes (ARIA, semantic HTML)
- [ ] Add string internationalization keys (i18n)

### 15.2 Service Creation Checklist
- [ ] Create service using `ng generate service`
- [ ] Provide in 'root'
- [ ] Document all public methods with JSDoc
- [ ] Use HttpClient for API calls
- [ ] Include error handling
- [ ] Return Observables (not Promises)
- [ ] Create mock service for testing

### 15.3 Before Committing Code
- [ ] Run `npm run lint` (ESLint passes)
- [ ] Run `npm test` (unit tests pass)
- [ ] Run `npm run build` (prod build succeeds)
- [ ] Check bundle size (< 500KB)
- [ ] Verify accessibility (Lighthouse > 90)
- [ ] Ensure no console errors/warnings
- [ ] Update documentation

---

## 16. Quick Reference Commands

```bash
# Project setup
ng new merchant-portal --standalone --routing
npm install

# Development
ng serve                    # Start dev server
ng lint                     # Run ESLint
ng test                     # Run unit tests
ng test --code-coverage     # Generate coverage report

# Build & Deploy
ng build --prod             # Production build
ng build --prod --stats-json  # Build with bundle analysis

# Code generation
ng generate component pages/invoices
ng generate service shared/services/invoice
ng generate guard shared/guards/auth
ng generate pipe shared/pipes/currency-format

# Testing
ng test --watch            # Watch mode
ng test --code-coverage    # Coverage report
ng e2e                      # End-to-end tests

# Analysis
npm run build -- --stats-json  # Analyze bundle size
npm run lighthouse             # Lighthouse audit
```

---

## 17. Resources & References

### Official Documentation
- [Angular Official Docs](https://angular.io/docs)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Best Practices
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code Principles](https://en.wikipedia.org/wiki/Robert_C._Martin#Books)

### Performance
- [Angular Performance Optimization Guide](https://angular.io/guide/performance-best-practices)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Angular Accessibility Guide](https://angular.io/guide/accessibility)
- [Web Accessibility Evaluation Tool (WAVE)](https://wave.webaim.org/)

---

## Document Control

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 6, 2026 | Initial Angular best practices guide for Merchant Portal |

**Last Updated**: February 6, 2026  
**Maintained By**: Tech Lead / Frontend Team  
**Review Cycle**: Quarterly or as needed

---

**Next Steps**:
1. Review this guide as a team
2. Agree on any project-specific modifications
3. Add to onboarding checklist for new developers
4. Reference in code reviews
5. Update quarterly with lessons learned
