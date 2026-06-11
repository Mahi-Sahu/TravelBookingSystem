import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-destinations-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-destinations-component.html',
  styleUrl: './manage-destinations-component.css',
})
export class ManageDestinationsComponent implements OnInit {
  destinations: any[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchDestinations();
  }

  fetchDestinations() {
    this.adminService.getAllDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
        this.cdr.detectChanges();
        console.log('Destinations:', data);
      },
      error: (err) => {
        console.error('Error fetching destinations', err);
      },
    });
  }

  deleteDestination(id: string) {
    if (confirm('Delete this destination?')) {
      this.adminService.deleteDestination(id).subscribe({
        next: () => {
          this.fetchDestinations(); // refresh data from db.json
        },
        error: (err) => {
          console.error('Delete failed', err);
        },
      });
    }
  }

  showAddForm = false;

  newDestination = {
    name: '',
    country: '',
    type: '',
    duration: '',
    price: 0,
    rating: 0,
  };

  openAddForm() {
    this.showAddForm = true;
    document.body.classList.add('modal-open');
  }

  closeAddForm() {
    this.showAddForm = false;
    document.body.classList.remove('modal-open');
  }

  addDestination() {
    const numericIds = this.destinations.map((d) => Number(d.id)).filter((id) => !isNaN(id));

    const nextId = Math.max(...numericIds, 0) + 1;

    const destination = {
      id: String(nextId),
      ...this.newDestination,
    };

    console.log('Sending:', destination);

    this.adminService.addDestination(destination).subscribe({
      next: (res) => {
        console.log('Saved:', res);

        this.fetchDestinations();

        this.newDestination = {
          name: '',
          country: '',
          type: '',
          duration: '',
          price: 0,
          rating: 0,
        };

        this.closeAddForm();
      },
      error: (err) => console.error(err),
    });
  }
}
