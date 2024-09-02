import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'shop',
    component: ShopComponent,
    title: 'Shop',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    title: 'Contact Us',
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];
