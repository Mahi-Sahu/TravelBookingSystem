import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-manage-notifications-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-notifications-component.html',
  styleUrl: './manage-notifications-component.css',
})
export class ManageNotificationsComponent implements OnInit {
  private fb = inject(FormBuilder);

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  notifications: any[] = [];
  users: any[] = [];

  showModal = false;

  isEditMode = false;

  selectedId = '';

  notificationForm = this.fb.group({
    userId: ['0'],
    type: ['BOOKING', Validators.required],
    title: ['', Validators.required],
    message: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadNotifications();
    this.loadUsers();
  }

  closeModal() {
    this.showModal = false;

    this.notificationForm.reset({
      userId: '',
      type: 'BOOKING',
      title: '',
      message: '',
    });
  }

  loadNotifications() {
    this.adminService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.cdr.detectChanges();
      },
    });
  }

  openAddNotification() {
    this.isEditMode = false;

    this.notificationForm.reset({
      userId: '',
      type: 'BOOKING',
      title: '',
      message: '',
    });

    this.showModal = true;
  }

  submitForm() {
    if (this.notificationForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.updateNotification();
    } else {
      this.openAddNotification();
    }
  }

  editNotification(notification: any) {
    this.isEditMode = true;

    this.selectedId = notification.id;

    this.notificationForm.patchValue({
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      message: notification.message,
    });

    this.showModal = true;
  }

  updateNotification() {
    const payload = {
      id: this.selectedId,
      userId: Number(this.notificationForm.value.userId),
      type: this.notificationForm.value.type,
      title: this.notificationForm.value.title,
      message: this.notificationForm.value.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    this.adminService.updateNotification(this.selectedId, payload).subscribe({
      next: () => {
        this.loadNotifications();
        this.resetForm();
      },
      error: (err) => console.error(err),
    });
  }

  deleteNotification(id: string) {
    if (!confirm('Delete Notification?')) {
      return;
    }

    this.adminService.deleteNotification(id).subscribe({
      next: () => {
        this.loadNotifications();
      },
      error: (err) => console.error(err),
    });
  }

  resetForm() {
    this.isEditMode = false;
    this.selectedId = '';

    this.notificationForm.reset({
      userId: '0',
      type: 'BOOKING',
      title: '',
      message: '',
    });

    this.cdr.detectChanges();
  }
}
