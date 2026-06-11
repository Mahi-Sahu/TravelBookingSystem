import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-manage-pricing-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-pricing-component.html',
  styleUrl: './manage-pricing-component.css',
})
export class ManagePricingComponent implements OnInit {
  pricingRules: any[] = [];

  showModal = false;
  isEditMode = false;

  selectedId = '';

  ruleForm = {
    serviceType: '',
    season: '',
    multiplier: null,
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchPriceRules();
  }

  fetchPriceRules() {
    this.adminService.getPriceRules().subscribe({
      next: (data) => {
        this.pricingRules = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  openAddForm() {
    this.isEditMode = false;

    this.ruleForm = {
      serviceType: '',
      season: '',
      multiplier: null,
    };

    this.showModal = true;
  }

  editRule(rule: any) {
    this.isEditMode = true;

    this.selectedId = rule.id;

    this.ruleForm = {
      serviceType: rule.serviceType,
      season: rule.season,
      multiplier: rule.multiplier,
    };

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveRule() {
    if (this.isEditMode) {
      this.updateRule();
    } else {
      this.addRule();
    }
  }

  addRule() {
    const nextId = Math.max(...this.pricingRules.map((x) => Number(x.id)), 0) + 1;

    const payload = {
      id: String(nextId),
      ...this.ruleForm,
    };

    this.adminService.addPriceRule(payload).subscribe({
      next: () => {
        this.fetchPriceRules();
        this.closeModal();
      },
    });
  }

  updateRule() {
    const payload = {
      id: this.selectedId,
      ...this.ruleForm,
    };

    this.adminService.updatePriceRule(this.selectedId, payload).subscribe({
      next: () => {
        this.fetchPriceRules();
        this.closeModal();
      },
    });
  }

  deleteRule(id: string) {
    if (confirm('Delete Price Rule?')) {
      this.adminService.deletePriceRule(id).subscribe({
        next: () => {
          this.fetchPriceRules();
        },
      });
    }
  }
}
